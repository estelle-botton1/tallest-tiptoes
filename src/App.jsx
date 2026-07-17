import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "../pages/homepage-final";
import TheForum from "../pages/the-forum";
import TheEdit from "../pages/the-edit";
import TheShop from "../pages/the-shop";
import HisNotHers from "../pages/his-not-hers";
import TheGuide from "../pages/the-guide";
import About from "../pages/about";

function ScrollToTop() {
  var location = useLocation();
  useEffect(function () {
    window.scrollTo(0, 0);
  }, [location.pathname, location.state]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/the-forum" element={<TheForum />} />
        <Route path="/the-edit" element={<TheEdit />} />
        <Route path="/the-shop" element={<TheShop />} />
        <Route path="/his-not-hers" element={<HisNotHers />} />
        <Route path="/the-guide" element={<TheGuide />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;