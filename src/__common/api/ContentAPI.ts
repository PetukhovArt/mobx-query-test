import { BaseApi } from './BaseApi';

export type PostType = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export default class ContentAPI extends BaseApi {
  static load() {
    return this.Request<PostType[]>({
      method: 'GET',
      url: '/posts',
    });
  }
}
