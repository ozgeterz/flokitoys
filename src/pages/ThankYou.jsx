import { useEffect } from "react";
import { trackPurchase } from "../utils/fbPixel";

function ThankYou() {
  useEffect(() => {
    trackPurchase();
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Siparişiniz Alındı!
        </h2>
        <p className="text-gray-600">
          En kısa sürede sizinle iletişime geçeceğiz.
        </p>
      </div>
    </div>
  );
}

export default ThankYou;
