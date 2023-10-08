import { action, makeObservable, observable } from 'mobx';
import { Annotation } from 'mobx/dist/api/annotation';
import { HttpRequestStore } from './HttpRequestStore';
import { BaseApi } from '../BaseApi';
import axios from 'axios';
import {
  CancellablePromise,
  GetPromiseGeneric,
  HttpError,
  HttpRequestStatus,
  IHttpRequest,
} from '../../../../types';

const noop = () => void 0;

export class HttpRequest<
  Args extends Parameters<any> = Parameters<any>,
  Result extends CancellablePromise<any> = CancellablePromise<any>
> implements IHttpRequest<Args, Result>
{
  loading = true;

  error: HttpError = null;

  data: GetPromiseGeneric<Result> = null;

  private callApiFn: (...args: Args) => Result = noop;

  private promise: Result = null;

  status: HttpRequestStatus = 'wait-call';

  constructor(callApi: (...args: Args) => Result, dataDecorator?: Annotation) {
    this.callApiFn = callApi;

    makeObservable(this, {
      loading: observable,
      error: observable.ref,
      data: dataDecorator || observable.ref,
      cancel: action,
      status: observable,
      call: action,
    });

    HttpRequestStore.putRequest(this);
  }

  call(...args: Args): Result {
    this.cancel();
    this.error = null;
    this.promise = this.callApiFn(...args);
    this.status = 'loading';
    return this.promise
      .then(
        action((data) => {
          this.loading = !!axios.isCancel(data);
          this.error = null;
          if (data && !axios.isCancel(data)) {
            this.data = data;
            this.status = 'success';
          }
          return data;
        })
      )
      .catch(
        action((err) => {
          if (this.loading) {
            this.loading = false;
          }
          this.status = 'error';
          this.error = err;
          throw err;
        })
      ) as Result;

    // @ts-ignore
    return Promise.resolve();
  }

  cancel() {
    if (this.promise) {
      BaseApi.Cancel(this.promise.cancellationUuid);
    }
  }
}
