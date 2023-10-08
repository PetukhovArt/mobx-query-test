import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { provider, toValue } from 'react-ioc';
import './App.css';
import { Content } from '@/Content.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      // staleTime: Infinity
    },
  },
});

const App = provider([QueryClient, toValue(queryClient)])(() => {
  return (
    <Suspense fallback="Loading resources...">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Content />
      </QueryClientProvider>
    </Suspense>
  );
});
export default App;
