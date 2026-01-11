import { Link } from "react-router-dom";
import { useEffect } from "react";
import comedones from "../assets/comedones.jpg";
import furyah from "../assets/furyah.jpg";

function Home() {
  useEffect(() => {
    document.title = "Kaliteli Ürünler - Uygun Fiyatlar";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Dijital tartı ve tıraş makinesi ürünlerimizi keşfedin. Kapıda ödeme imkanı ile güvenli alışveriş."
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 w-full max-w-[390px] mx-auto">
      {/* Header */}
      <div className="text-center py-8 px-4">
        <p className="text-gray-400 text-sm">
          Kaliteli Ürünler, Uygun Fiyatlar
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-sky-500 to-amber-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Products Section */}
      <div className="px-4 pb-8">
        <h2 className="text-lg font-semibold text-gray-300 mb-4 text-center">
          🛍️ Ürünlerimiz
        </h2>

        <div className="space-y-4">
          {/* Dijital Tartı Card */}
          <Link
            to="/dijitaltarti"
            className="block bg-gradient-to-br from-sky-900/50 to-blue-900/50 rounded-2xl overflow-hidden border border-sky-700/30 hover:border-sky-500/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-sky-500/10"
          >
            <div className="relative">
              <img
                src={comedones}
                alt="Dijital Tartı"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <span className="bg-sky-500 text-white text-xs font-bold px-2 py-1 rounded">
                  POPÜLER
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-white mb-1">
                Dijital Yağ Su Kas Tartısı
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Vücut kitle endeksi ölçer, akıllı tartı
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-sky-400">
                    700 TL
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    den başlayan
                  </span>
                </div>
                <div className="bg-sky-500 text-white px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-1">
                  İncele
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Tıraş Makinesi Card */}
          <Link
            to="/tirasmakinesi"
            className="block bg-gradient-to-br from-sky-900/50 to-blue-900/50 rounded-2xl overflow-hidden border border-sky-700/30 hover:border-sky-500/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-sky-500/10"
          >
            <div className="relative">
              <img
                src={furyah}
                alt="Tıraş Makinesi"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <span className="bg-sky-500 text-white text-xs font-bold px-2 py-1 rounded">
                  YENİ
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-white mb-1">
                Profesyonel Tıraş Makinesi
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Şarjlı, su geçirmez, profesyonel kalite
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-sky-400">
                    399 TL
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    den başlayan
                  </span>
                </div>
                <div className="bg-sky-500 text-white px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-1">
                  İncele
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 pb-8">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-700/50">
            <span className="text-2xl">🚚</span>
            <p className="text-gray-300 text-xs mt-1 font-medium">
              Hızlı Kargo
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-700/50">
            <span className="text-2xl">💳</span>
            <p className="text-gray-300 text-xs mt-1 font-medium">
              Kapıda Ödeme
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-700/50">
            <span className="text-2xl">✅</span>
            <p className="text-gray-300 text-xs mt-1 font-medium">
              Güvenli Alışveriş
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white text-center py-4 text-sm border-t border-gray-800">
        <p>© 2026</p>
        <p className="text-gray-500 text-xs mt-1">
          Kapıda Nakit veya Kart ile Ödeme
        </p>
      </div>
    </div>
  );
}

export default Home;
