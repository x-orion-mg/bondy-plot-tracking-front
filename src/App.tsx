import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} future={{ v7_startTransition: true }} />
    </QueryClientProvider>
  );
}

export default App;
