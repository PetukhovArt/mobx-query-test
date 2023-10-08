import { makeAutoObservable } from 'mobx';
import { MobxQuery } from '@/__common/mobx/mobx-query.ts';
import ContentAPI, { PostType } from '@/__common/api/ContentAPI.ts';

export class ContentStore {
  #moviesQueryResult = new MobxQuery({
    queryKey: ['posts'],
    queryFn: () => ContentAPI.load(),
    select: (res: PostType[]) => res.filter((post) => post.title.includes('dol')),
  });

  constructor() {
    makeAutoObservable(this);
  }

  get posts() {
    return this.#moviesQueryResult.query();
  }

  dispose() {
    this.#moviesQueryResult.dispose();
  }
}
