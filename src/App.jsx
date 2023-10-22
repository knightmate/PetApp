import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";
import SearchParams from "./SearchParams";
import HomePageBanner from "../pages/HomepageBanner";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        {/* <HomePageBanner/> */}
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
 
export default App;