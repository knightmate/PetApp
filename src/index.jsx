import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import Details from "./Details";
import SearchParams from "./SearchParams";
 
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const  AppContainer= () => {
  return (
    <div>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
 
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("rootReact");
const root = createRoot(container);
root.render(<AppContainer />);