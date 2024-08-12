// react-query-client.js

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
export function ReactQueryProvider({ children }) {

 return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
