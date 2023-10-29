import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React,{Suspense, useState,lazy} from "react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
 import SearchParams from "./SearchParams";
import AdoptedPetContext from "./AdoptedPetContext";
import Loader from "./Component/Loader";
 
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const Details=lazy(()=>import("./Details"));

const  AppContainer= () => {
  const adoptedPet = useState(null);
  return (
    <div>
      <BrowserRouter>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            <Suspense
            fallback={
                <Loader/>
              }
            >  
              <header>
              <Link to="/">Adopt Me!</Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
            </Suspense>

          </QueryClientProvider>
        </AdoptedPetContext.Provider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("rootReact");
const root = createRoot(container);
root.render(<AppContainer />);