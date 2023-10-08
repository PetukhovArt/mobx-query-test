import { HttpRequest } from "./HttpRequest";


export class HttpRequestStore {

  private static requests: HttpRequest[] = [];

  static putRequest( req: HttpRequest ) {
    HttpRequestStore.requests.push( req );
  }

  static cancelAll() {
    this.requests.forEach( req => req.cancel() );
  }

}
