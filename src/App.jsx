import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import DigitalTarti from "./pages/DigitalTarti";
import ThankYou from "./pages/ThankYou";
import { trackPageView } from "./utils/fbPixel";

function App() {
  const location = useLocation();

  useEffect(() => {
    trackPageView();
  }, [location]);

  return (
    <Routes>
      <Route path="/dijitaltarti" element={<DigitalTarti />} />
      <Route path="/tesekkurler" element={<ThankYou />} />
      <Route path="/" element={<DigitalTarti />} />
    </Routes>
  );
}

export default App;
