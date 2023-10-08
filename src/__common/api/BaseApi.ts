import axios, {AxiosRequestConfig, Canceler} from 'axios';
import {CancellablePromise} from '../../../types';
import {NETWORK_TIMEOUT} from '../../../constants';
import NotificationService from '@/service/NotificationService';

// const MAX_CONCURRENT_REQUESTS = 1;
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

axios.interceptors.request.use(
  function (config) {
    // const token = sessionStorage.getItem('token'); // добавляем токен
    // const skipToken =
    //   config.headers.skipToken && config.headers.skipToken === 'true';
    // if (skipToken || !token) return config;
    // if (!token) {
    //   return {
    //     ...config,
    //     status: 401,
    //     cancelToken: new axios.CancelToken((cancel) => cancel('no token data')),
    //   };
    // }
    // const headers = {
    //   ...config.headers,
    //   token,
    // };
    return {
      ...config,
      // headers,
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    if ('response' in error) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

// const manager = ConcurrencyManager(axios, MAX_CONCURRENT_REQUESTS);

export class BaseApi {
  private static CancellationMap = new Map<string, Canceler>();

  static Cancel(cancellationUuid: string) {
    const canceler = BaseApi.CancellationMap.get(cancellationUuid);
    if (typeof canceler === 'function') {
      canceler();
    }
  }

  static modifyConfig(config: AxiosRequestConfig) {
    const token = sessionStorage.getItem('token'); // добавляем токен
    if (!token) return config;
    return {
      ...config,
      headers: {
        token: token,
      },
    };
  }

  static Request<Result>(
    config: AxiosRequestConfig,
    skipToken = false,
    resolveResponseData = true,
    useTimeout = config.method?.toUpperCase() === 'GET',
    handleStatus = true
  ): CancellablePromise<Result> {
    const cancellationUuid = Date.now().toString();
    config.baseURL = axios.defaults.baseURL;
    config.cancelToken = new axios.CancelToken((cb) => {
      BaseApi.CancellationMap.set(cancellationUuid, cb);
    });
    if (skipToken) {
      config = { ...config, headers: { skipToken: true } };
    }
    if (useTimeout) {
      config.timeout = config.timeout ? config.timeout : NETWORK_TIMEOUT;
    }
    const promise = axios(config)
      .then((res) => {
        if (handleStatus) {
          // TODO: handleResponse( res );
        }
        return resolveResponseData ? res.data : res;
      })
      .catch((err) => {
        if (handleStatus) {
          switch (err.code) {
            case 'ECONNABORTED':
              NotificationService.enqueueSnackbar('Request timeout', 'error');
              break;

            default:
              break;
          }
        }
        if (!axios.isCancel(err)) {
          // const error = err.response;
          // if (error && 'status' in error) this.handleError(error);
          console.error(err);
        }
        throw err;
      });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    promise['cancellationUuid'] = cancellationUuid;
    console.log(this.CancellationMap);
    return promise;
  }
}

// static handleError(error) {
//   switch (error.status) {
//     case 401:
//       import.meta.env.PROD
//         ? import('../service/auth/AuthProvider').then((AuthProvider) => {
//             AuthProvider.default.clearUserData();
//           })
//         : sessionStorage.removeItem('token');
//       history.push('/');
//       break;
//     case 403:
//       switch (error.data.message) {
//         case 'Configuration modification not allowed':
//           NotificationService.enqueueSnackbar(
//             i18n.t('Configuration modification not allowed'),
//             'error'
//           );
//           break;
//         default:
//           break;
//       }
//       break;
//     case 500:
//       NotificationService.enqueueSnackbar(i18n.t('Server is not available!'), 'error');
//       break;
//     default:
//       break;
//   }
// }
