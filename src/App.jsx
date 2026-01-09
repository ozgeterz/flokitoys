import { Routes, Route } from "react-router-dom";
import DigitalTarti from "./pages/DigitalTarti";
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <Routes>
      <Route path="/dijitaltarti" element={<DigitalTarti />} />
      <Route path="/tesekkurler" element={<ThankYou />} />
      <Route path="/" element={<DigitalTarti />} />
    </Routes>
  );
}

export default App;
