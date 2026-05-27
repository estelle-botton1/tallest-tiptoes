import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../pages/homepage-final";
import TheForum from "../pages/the-forum";
import TheShop from "../pages/the-shop";
import HisNotHers from "../pages/his-not-hers";
import TheGuide from "../pages/the-guide";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/the-forum" element={<TheForum />} />
        <Route path="/the-edit" element={<TheEdit />} />
        <Route path="/the-shop" element={<TheShop />} />
        <Route path="/his-not-hers" element={<HisNotHers />} />
        <Route path="/the-guide" element={<TheGuide />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;