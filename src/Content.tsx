import { observer } from 'mobx-react-lite';
import { provider, useInstance } from 'react-ioc';
import { ContentStore } from '@/service/ContentService.ts';

export const Content = provider(ContentStore)(
  observer(() => {
    const { posts } = useInstance(ContentStore);

    if (posts.isLoading) return <>Loading...</>;
    if (posts.isError) return <>Error occurred :(</>;

    return (
      <>
        <p></p>
        <ul>
          {posts.data?.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </>
    );
  })
);
