import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import DigitalTarti from "./pages/DigitalTarti";
import ShaverProduct from "./pages/ShaverProduct";
import ThankYou from "./pages/ThankYou";
import { trackPageView } from "./utils/fbPixel";

function App() {
  const location = useLocation();

  useEffect(() => {
    trackPageView();
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dijitaltarti" element={<DigitalTarti />} />
      <Route path="/tirasmakinesi" element={<ShaverProduct />} />
      <Route path="/tesekkurler" element={<ThankYou />} />
    </Routes>
  );
}

export default App;
