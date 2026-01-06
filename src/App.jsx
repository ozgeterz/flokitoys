import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "cash",
    quantity: "1",
    customTemplate: "no",
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    const prices = { 1: 699, 2: 1299, 3: 1699 };
    const basePrice = prices[formData.quantity] || 699;
    const templatePrice = formData.customTemplate === "yes" ? 249 : 0;
    return basePrice + templatePrice;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formId = import.meta.env.VITE_GOOGLE_FORM_ID;
    if (!formId) return;
    console.log(formId);
    const baseUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

    const quantityText =
      formData.quantity === "1"
        ? "1 ADET LED IŞIKLI ÇİZİM TABLETİ - KARGO ÜCRETSİZ: 699 TL"
        : formData.quantity === "2"
        ? "2 ADET LED IŞIKLI ÇİZİM TABLETİ - KARGO ÜCRETSİZ: 1.299 TL"
        : "3 ADET LED IŞIKLI ÇİZİM TABLETİ - KARGO ÜCRETSİZ: 1.699 TL";
    const templateText =
      formData.customTemplate === "yes" ? "İSTİYORUM" : "İSTEMİYORUM";

    const paymentText =
      formData.paymentMethod === "cash" ? "Kapıda Nakit" : "Kapıda Kart";

    // Google Forms POST submit (CORS'suz) - form-urlencoded
    const body = new URLSearchParams({
      "entry.2137149469": formData.name,
      "entry.1363404741": formData.phone,
      "entry.1369833272": formData.city,
      "entry.1325150466": formData.address,
      "entry.1998382733": quantityText,
      "entry.1101981111": templateText,
      "entry.2077012825": paymentText,
    });

    fetch(baseUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body,
    }).catch((err) => {
      console.error("Google Forms gönderim hatası:", err);
    });

    setOrderSuccess(true);
  };

  if (orderSuccess) {
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

  return (
    <div className="min-h-screen bg-white w-[390px] mx-auto">
      {/* Header Banner */}
      <div className="bg-red-600 text-white text-center py-2 text-sm font-bold">
        🔥 SINIRLI STOK - KAMPANYA BİTMEDEN SİPARİŞ VERİN!
      </div>

      {/* Product Image Carousel */}
      <div className="bg-gradient-to-b from-blue-50 to-white p-4">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden border-4 border-gray-700">
              {/* LED Frame Effect */}
              <div className="absolute inset-0 border-8 border-yellow-400/30 rounded-lg"></div>

              {/* LED Strip at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 opacity-60"></div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-around py-1">
                <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-orange-300 rounded-full animate-pulse"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-orange-300 rounded-full animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>

              {/* Drawing Content */}
              <svg viewBox="0 0 300 300" className="w-full h-full p-4">
                {/* Background */}
                <rect width="300" height="300" fill="#1a1a1a" rx="10" />

                {/* Mermaid Drawing */}
                <g>
                  {/* Name "Elsa" */}
                  <text
                    x="20"
                    y="30"
                    fill="#FFD700"
                    fontSize="20"
                    fontWeight="bold"
                  >
                    Elsa
                  </text>

                  {/* Mermaid Body */}
                  <path
                    d="M 150 80 Q 140 90 140 110 L 140 140 Q 140 150 150 150 Q 160 150 160 140 L 160 110 Q 160 90 150 80"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="3"
                  />

                  {/* Head */}
                  <circle
                    cx="150"
                    cy="70"
                    r="15"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="3"
                  />

                  {/* Hair */}
                  <path
                    d="M 135 65 Q 130 50 140 45 Q 150 42 160 45 Q 170 50 165 65"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="3"
                  />
                  <path
                    d="M 140 65 L 135 75"
                    stroke="#FFD700"
                    strokeWidth="2"
                  />
                  <path
                    d="M 145 67 L 140 77"
                    stroke="#FFD700"
                    strokeWidth="2"
                  />
                  <path
                    d="M 155 67 L 160 77"
                    stroke="#FFD700"
                    strokeWidth="2"
                  />
                  <path
                    d="M 160 65 L 165 75"
                    stroke="#FFD700"
                    strokeWidth="2"
                  />

                  {/* Crown */}
                  <path
                    d="M 140 55 L 145 45 L 150 50 L 155 45 L 160 55"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="2"
                  />

                  {/* Face */}
                  <circle cx="145" cy="68" r="2" fill="#FFD700" />
                  <circle cx="155" cy="68" r="2" fill="#FFD700" />
                  <path
                    d="M 145 73 Q 150 76 155 73"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="2"
                  />

                  {/* Arms */}
                  <path
                    d="M 140 100 L 125 110 L 120 105"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="3"
                  />
                  <path
                    d="M 160 100 L 175 110 L 180 105"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="3"
                  />

                  {/* Magic Wand */}
                  <line
                    x1="180"
                    y1="105"
                    x2="195"
                    y2="95"
                    stroke="#FFD700"
                    strokeWidth="2"
                  />
                  <circle cx="195" cy="95" r="4" fill="#FFD700" />
                  <line
                    x1="192"
                    y1="92"
                    x2="188"
                    y2="88"
                    stroke="#FFD700"
                    strokeWidth="1"
                  />
                  <line
                    x1="198"
                    y1="92"
                    x2="202"
                    y2="88"
                    stroke="#FFD700"
                    strokeWidth="1"
                  />
                  <line
                    x1="195"
                    y1="98"
                    x2="195"
                    y2="102"
                    stroke="#FFD700"
                    strokeWidth="1"
                  />

                  {/* Tail with scales */}
                  <path
                    d="M 150 150 L 145 170 Q 140 190 135 200 Q 130 210 125 215"
                    fill="none"
                    stroke="#FF1493"
                    strokeWidth="3"
                  />
                  <path
                    d="M 150 150 L 155 170 Q 160 190 165 200 Q 170 210 175 215"
                    fill="none"
                    stroke="#FF1493"
                    strokeWidth="3"
                  />

                  {/* Scales Pattern */}
                  <circle
                    cx="145"
                    cy="160"
                    r="3"
                    fill="none"
                    stroke="#FF69B4"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="155"
                    cy="160"
                    r="3"
                    fill="none"
                    stroke="#FF69B4"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="142"
                    cy="170"
                    r="3"
                    fill="none"
                    stroke="#FF69B4"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="152"
                    cy="170"
                    r="3"
                    fill="none"
                    stroke="#FF69B4"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="140"
                    cy="180"
                    r="3"
                    fill="none"
                    stroke="#FF69B4"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="148"
                    cy="180"
                    r="3"
                    fill="none"
                    stroke="#FF69B4"
                    strokeWidth="1.5"
                  />

                  {/* Tail Fin */}
                  <path
                    d="M 125 215 Q 115 220 110 230 Q 115 225 125 220"
                    fill="none"
                    stroke="#FF1493"
                    strokeWidth="3"
                  />
                  <path
                    d="M 175 215 Q 185 220 190 230 Q 185 225 175 220"
                    fill="none"
                    stroke="#FF1493"
                    strokeWidth="3"
                  />

                  {/* Decorative Fish */}
                  <ellipse
                    cx="220"
                    cy="100"
                    rx="8"
                    ry="5"
                    fill="none"
                    stroke="#00CED1"
                    strokeWidth="2"
                  />
                  <path
                    d="M 212 100 L 205 95 L 205 105 Z"
                    fill="none"
                    stroke="#00CED1"
                    strokeWidth="2"
                  />
                  <circle cx="223" cy="99" r="1" fill="#00CED1" />

                  <ellipse
                    cx="80"
                    cy="120"
                    rx="8"
                    ry="5"
                    fill="none"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                  <path
                    d="M 72 120 L 65 115 L 65 125 Z"
                    fill="none"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                  <circle cx="83" cy="119" r="1" fill="#FFA500" />

                  <ellipse
                    cx="240"
                    cy="160"
                    rx="6"
                    ry="4"
                    fill="none"
                    stroke="#32CD32"
                    strokeWidth="2"
                  />
                  <path
                    d="M 234 160 L 228 156 L 228 164 Z"
                    fill="none"
                    stroke="#32CD32"
                    strokeWidth="2"
                  />

                  {/* Seaweed */}
                  <path
                    d="M 50 250 Q 45 230 50 210 Q 55 190 50 170"
                    fill="none"
                    stroke="#32CD32"
                    strokeWidth="3"
                  />
                  <path
                    d="M 60 250 Q 65 230 60 210 Q 55 190 60 170"
                    fill="none"
                    stroke="#32CD32"
                    strokeWidth="3"
                  />

                  <path
                    d="M 250 250 Q 245 230 250 210 Q 255 190 250 170"
                    fill="none"
                    stroke="#00CED1"
                    strokeWidth="3"
                  />
                  <path
                    d="M 260 250 Q 265 230 260 210 Q 255 190 260 170"
                    fill="none"
                    stroke="#00CED1"
                    strokeWidth="3"
                  />

                  {/* Coral/Stars */}
                  <path
                    d="M 200 240 L 205 250 L 210 240 L 215 250 L 220 240"
                    fill="none"
                    stroke="#FFA500"
                    strokeWidth="2"
                  />
                  <circle
                    cx="90"
                    cy="240"
                    r="4"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="2"
                  />
                  <circle
                    cx="100"
                    cy="250"
                    r="3"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="2"
                  />
                </g>

                {/* LED Glow Effect */}
                <rect
                  width="300"
                  height="300"
                  fill="url(#glow)"
                  rx="10"
                  opacity="0.3"
                />
                <defs>
                  <radialGradient id="glow">
                    <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>

              {/* LED Lights Animation */}
              <div className="absolute top-2 right-2 flex gap-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.6s" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Product Label */}
          <div className="text-center mt-3">
            <p className="text-purple-600 font-bold text-lg">Floki Tablet</p>
            <p className="text-gray-500 text-sm">LED Çizim Tahtası</p>
          </div>
        </div>
      </div>

      {/* Product Title & Price */}
      <div className="px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Floki Tablet - LED Çizim Tahtası
        </h1>
        <p className="text-gray-500 mt-1">Çocuklar için eğitici ve eğlenceli</p>

        <div className="flex items-center gap-3 mt-4">
          <span className="text-gray-400 line-through text-xl">449₺</span>
          <span className="text-3xl font-bold text-red-600">299₺</span>
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-bold">
            %33 İNDİRİM
          </span>
        </div>
      </div>

      {/* Features */}
      <div className="px-4 py-4 bg-gray-50">
        <h2 className="font-bold text-lg text-gray-800 mb-3">
          ✨ Ürün Özellikleri
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-white p-3 rounded-xl">
            <span className="text-2xl">💡</span>
            <div>
              <p className="font-bold text-gray-800">LED Aydınlatma</p>
              <p className="text-gray-500 text-sm">
                Karanlıkta bile çizim yapabilme
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white p-3 rounded-xl">
            <span className="text-2xl">🖍️</span>
            <div>
              <p className="font-bold text-gray-800">6 Renkli Kalem</p>
              <p className="text-gray-500 text-sm">
                Parlak fosforlu kalemler dahil
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white p-3 rounded-xl">
            <span className="text-2xl">🔋</span>
            <div>
              <p className="font-bold text-gray-800">USB Şarjlı</p>
              <p className="text-gray-500 text-sm">Uzun ömürlü batarya</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white p-3 rounded-xl">
            <span className="text-2xl">🧒</span>
            <div>
              <p className="font-bold text-gray-800">Eğitici Eğlence</p>
              <p className="text-gray-500 text-sm">Yaratıcılığı geliştirir</p>
            </div>
          </div>
        </div>
      </div>

      {/* Example Drawings Gallery */}
      <div className="px-4 py-4 bg-gradient-to-b from-purple-50 to-pink-50">
        <h2 className="font-bold text-lg text-gray-800 mb-3 text-center">
          🎨 Gerçek Müşteri Çizimleri
        </h2>
        <p className="text-gray-600 text-sm text-center mb-4">
          Çocuklar Floki Tablet ile bunları çiziyor! 🌟
        </p>

        <div className="space-y-4">
          {/* Example 1 - Christmas Tree & Snowman */}
          <div className="bg-gray-900 rounded-xl p-4 border-4 border-yellow-400/50 relative">
            <div className="absolute bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 opacity-50"></div>
            <svg viewBox="0 0 350 200" className="w-full">
              <rect width="350" height="200" fill="#2a2a2a" />
              <text
                x="10"
                y="25"
                fill="#FFD700"
                fontSize="18"
                fontWeight="bold"
              >
                7 KALEM HEDİYE
              </text>

              {/* Christmas Tree */}
              <path
                d="M 80 50 L 60 80 L 100 80 Z"
                fill="none"
                stroke="#90EE90"
                strokeWidth="3"
              />
              <path
                d="M 75 75 L 55 105 L 105 105 Z"
                fill="none"
                stroke="#90EE90"
                strokeWidth="3"
              />
              <path
                d="M 70 100 L 50 130 L 110 130 Z"
                fill="none"
                stroke="#90EE90"
                strokeWidth="3"
              />
              <rect
                x="75"
                y="130"
                width="10"
                height="15"
                fill="none"
                stroke="#8B4513"
                strokeWidth="2"
              />
              <circle cx="70" cy="65" r="3" fill="#FFD700" />
              <circle cx="85" cy="70" r="3" fill="#FFD700" />
              <circle cx="65" cy="90" r="3" fill="#FFD700" />
              <circle cx="90" cy="95" r="3" fill="#FFD700" />
              <circle cx="60" cy="115" r="3" fill="#FFD700" />
              <circle cx="95" cy="120" r="3" fill="#FFD700" />
              <path
                d="M 80 45 L 75 35 L 80 40 L 85 35 L 80 45"
                fill="none"
                stroke="#FFD700"
                strokeWidth="2"
              />

              {/* Snowman */}
              <circle
                cx="180"
                cy="110"
                r="15"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3"
              />
              <circle
                cx="180"
                cy="145"
                r="20"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3"
              />
              <circle cx="175" cy="107" r="2" fill="#000" />
              <circle cx="185" cy="107" r="2" fill="#000" />
              <path
                d="M 175 115 Q 180 118 185 115"
                fill="none"
                stroke="#FFA500"
                strokeWidth="2"
              />
              <line
                x1="180"
                y1="110"
                x2="190"
                y2="105"
                stroke="#FFA500"
                strokeWidth="2"
              />
              <circle cx="190" cy="105" r="2" fill="#FFA500" />

              {/* Hat */}
              <rect
                x="170"
                y="85"
                width="20"
                height="8"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />
              <rect
                x="173"
                y="75"
                width="14"
                height="10"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />

              {/* Scarf */}
              <path
                d="M 165 125 Q 180 130 195 125"
                fill="none"
                stroke="#FFD700"
                strokeWidth="3"
              />
              <line
                x1="195"
                y1="125"
                x2="200"
                y2="135"
                stroke="#FFD700"
                strokeWidth="2"
              />

              {/* Buttons */}
              <circle cx="180" cy="135" r="2" fill="#000" />
              <circle cx="180" cy="145" r="2" fill="#000" />
              <circle cx="180" cy="155" r="2" fill="#000" />

              {/* Gifts */}
              <rect
                x="50"
                y="145"
                width="15"
                height="15"
                fill="none"
                stroke="#FFD700"
                strokeWidth="2"
              />
              <line
                x1="57.5"
                y1="145"
                x2="57.5"
                y2="160"
                stroke="#FF6347"
                strokeWidth="2"
              />
              <line
                x1="50"
                y1="152.5"
                x2="65"
                y2="152.5"
                stroke="#FF6347"
                strokeWidth="2"
              />

              <rect
                x="220"
                y="150"
                width="12"
                height="12"
                fill="none"
                stroke="#FF69B4"
                strokeWidth="2"
              />
              <line
                x1="226"
                y1="150"
                x2="226"
                y2="162"
                stroke="#FFD700"
                strokeWidth="2"
              />

              {/* Snowflakes */}
              <g>
                <line
                  x1="30"
                  y1="30"
                  x2="30"
                  y2="40"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <line
                  x1="25"
                  y1="35"
                  x2="35"
                  y2="35"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <line
                  x1="27"
                  y1="32"
                  x2="33"
                  y2="38"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                />
                <line
                  x1="33"
                  y1="32"
                  x2="27"
                  y2="38"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                />
              </g>
              <g>
                <line
                  x1="250"
                  y1="40"
                  x2="250"
                  y2="50"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <line
                  x1="245"
                  y1="45"
                  x2="255"
                  y2="45"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <line
                  x1="247"
                  y1="42"
                  x2="253"
                  y2="48"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                />
                <line
                  x1="253"
                  y1="42"
                  x2="247"
                  y2="48"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                />
              </g>
              <g>
                <line
                  x1="300"
                  y1="70"
                  x2="300"
                  y2="80"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <line
                  x1="295"
                  y1="75"
                  x2="305"
                  y2="75"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              </g>

              {/* Stars */}
              <circle cx="130" cy="40" r="2" fill="#FFD700" />
              <circle cx="270" cy="100" r="2" fill="#FFD700" />
              <circle cx="320" cy="50" r="2" fill="#FFD700" />
            </svg>
            <p className="text-yellow-300 text-sm text-center mt-2 font-bold">
              Noel Teması 🎄⛄
            </p>
          </div>

          {/* Example 2 - Birthday Theme */}
          <div className="bg-gray-900 rounded-xl p-4 border-4 border-pink-400/50 relative">
            <div className="absolute bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 opacity-50"></div>
            <svg viewBox="0 0 350 200" className="w-full">
              <rect width="350" height="200" fill="#2a2a2a" />
              <text
                x="10"
                y="25"
                fill="#FF69B4"
                fontSize="18"
                fontWeight="bold"
              >
                İYİ Kİ DOĞDUN!
              </text>

              {/* Cake */}
              <rect
                x="120"
                y="120"
                width="110"
                height="60"
                fill="none"
                stroke="#FFB6C1"
                strokeWidth="3"
              />
              <rect
                x="130"
                y="100"
                width="90"
                height="20"
                fill="none"
                stroke="#FF69B4"
                strokeWidth="3"
              />

              {/* Cake decoration */}
              <circle cx="145" cy="140" r="4" fill="#FFD700" />
              <circle cx="175" cy="140" r="4" fill="#FFD700" />
              <circle cx="205" cy="140" r="4" fill="#FFD700" />
              <circle cx="145" cy="160" r="4" fill="#FFD700" />
              <circle cx="175" cy="160" r="4" fill="#FFD700" />
              <circle cx="205" cy="160" r="4" fill="#FFD700" />

              {/* Candles */}
              <rect
                x="145"
                y="85"
                width="5"
                height="15"
                fill="none"
                stroke="#FF6347"
                strokeWidth="2"
              />
              <ellipse
                cx="147.5"
                cy="82"
                rx="3"
                ry="5"
                fill="none"
                stroke="#FFD700"
                strokeWidth="2"
              />
              <line
                x1="147.5"
                y1="77"
                x2="147.5"
                y2="82"
                stroke="#FFA500"
                strokeWidth="1.5"
              />

              <rect
                x="172.5"
                y="85"
                width="5"
                height="15"
                fill="none"
                stroke="#FF6347"
                strokeWidth="2"
              />
              <ellipse
                cx="175"
                cy="82"
                rx="3"
                ry="5"
                fill="none"
                stroke="#FFD700"
                strokeWidth="2"
              />
              <line
                x1="175"
                y1="77"
                x2="175"
                y2="82"
                stroke="#FFA500"
                strokeWidth="1.5"
              />

              <rect
                x="200"
                y="85"
                width="5"
                height="15"
                fill="none"
                stroke="#FF6347"
                strokeWidth="2"
              />
              <ellipse
                cx="202.5"
                cy="82"
                rx="3"
                ry="5"
                fill="none"
                stroke="#FFD700"
                strokeWidth="2"
              />
              <line
                x1="202.5"
                y1="77"
                x2="202.5"
                y2="82"
                stroke="#FFA500"
                strokeWidth="1.5"
              />

              {/* Balloons */}
              <ellipse
                cx="50"
                cy="80"
                rx="15"
                ry="20"
                fill="none"
                stroke="#FF1493"
                strokeWidth="2"
              />
              <line
                x1="50"
                y1="100"
                x2="50"
                y2="130"
                stroke="#FF1493"
                strokeWidth="1.5"
              />

              <ellipse
                cx="80"
                cy="60"
                rx="15"
                ry="20"
                fill="none"
                stroke="#00CED1"
                strokeWidth="2"
              />
              <line
                x1="80"
                y1="80"
                x2="80"
                y2="130"
                stroke="#00CED1"
                strokeWidth="1.5"
              />

              <ellipse
                cx="280"
                cy="70"
                rx="15"
                ry="20"
                fill="none"
                stroke="#FFD700"
                strokeWidth="2"
              />
              <line
                x1="280"
                y1="90"
                x2="280"
                y2="130"
                stroke="#FFD700"
                strokeWidth="1.5"
              />

              <ellipse
                cx="310"
                cy="90"
                rx="15"
                ry="20"
                fill="none"
                stroke="#32CD32"
                strokeWidth="2"
              />
              <line
                x1="310"
                y1="110"
                x2="310"
                y2="140"
                stroke="#32CD32"
                strokeWidth="1.5"
              />

              {/* Confetti */}
              <circle cx="30" cy="40" r="2" fill="#FFD700" />
              <circle cx="100" cy="30" r="2" fill="#FF69B4" />
              <circle cx="250" cy="35" r="2" fill="#00CED1" />
              <circle cx="320" cy="50" r="2" fill="#FF6347" />
              <rect x="60" y="45" width="3" height="3" fill="#9370DB" />
              <rect x="270" y="120" width="3" height="3" fill="#FFD700" />
            </svg>
            <p className="text-pink-300 text-sm text-center mt-2 font-bold">
              Doğum Günü 🎂🎈
            </p>
          </div>

          {/* Example 3 - Space Theme */}
          <div className="bg-gray-900 rounded-xl p-4 border-4 border-blue-400/50 relative">
            <div className="absolute bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 opacity-50"></div>
            <svg viewBox="0 0 350 200" className="w-full">
              <rect width="350" height="200" fill="#1a1a2e" />
              <text
                x="10"
                y="25"
                fill="#00CED1"
                fontSize="18"
                fontWeight="bold"
              >
                UZAY MACERALARI
              </text>

              {/* Rocket */}
              <path
                d="M 100 80 L 90 120 L 90 150 L 110 150 L 110 120 Z"
                fill="none"
                stroke="#FF6347"
                strokeWidth="3"
              />
              <path
                d="M 100 80 L 95 90 L 105 90 Z"
                fill="none"
                stroke="#FFD700"
                strokeWidth="2"
              />
              <circle
                cx="100"
                cy="110"
                r="10"
                fill="none"
                stroke="#00CED1"
                strokeWidth="2"
              />
              <circle
                cx="100"
                cy="110"
                r="5"
                fill="none"
                stroke="#00CED1"
                strokeWidth="1.5"
              />
              <path
                d="M 90 150 L 85 170 L 90 165 Z"
                fill="none"
                stroke="#FFA500"
                strokeWidth="2"
              />
              <path
                d="M 110 150 L 115 170 L 110 165 Z"
                fill="none"
                stroke="#FFA500"
                strokeWidth="2"
              />
              <path d="M 100 150 L 100 175" stroke="#FF6347" strokeWidth="2" />
              <line
                x1="95"
                y1="170"
                x2="92"
                y2="175"
                stroke="#FFA500"
                strokeWidth="1.5"
              />
              <line
                x1="105"
                y1="170"
                x2="108"
                y2="175"
                stroke="#FFA500"
                strokeWidth="1.5"
              />

              {/* Planet */}
              <circle
                cx="250"
                cy="100"
                r="35"
                fill="none"
                stroke="#9370DB"
                strokeWidth="3"
              />
              <ellipse
                cx="250"
                cy="100"
                rx="50"
                ry="8"
                fill="none"
                stroke="#9370DB"
                strokeWidth="2"
              />
              <circle cx="240" cy="90" r="5" fill="#9370DB" opacity="0.5" />
              <circle cx="265" cy="105" r="7" fill="#9370DB" opacity="0.5" />
              <circle cx="245" cy="115" r="4" fill="#9370DB" opacity="0.5" />

              {/* Stars */}
              <circle cx="40" cy="50" r="2" fill="#FFD700" />
              <circle cx="70" cy="40" r="2" fill="#FFD700" />
              <circle cx="150" cy="35" r="2" fill="#FFD700" />
              <circle cx="180" cy="60" r="2" fill="#FFD700" />
              <circle cx="320" cy="45" r="2" fill="#FFD700" />
              <circle cx="300" cy="80" r="2" fill="#FFD700" />
              <circle cx="50" cy="120" r="2" fill="#FFD700" />
              <circle cx="180" cy="150" r="2" fill="#FFD700" />
              <circle cx="310" cy="140" r="2" fill="#FFD700" />

              {/* Alien */}
              <circle
                cx="180"
                cy="160"
                r="12"
                fill="none"
                stroke="#32CD32"
                strokeWidth="2"
              />
              <circle cx="175" cy="157" r="3" fill="#32CD32" />
              <circle cx="185" cy="157" r="3" fill="#32CD32" />
              <path
                d="M 175 165 Q 180 168 185 165"
                fill="none"
                stroke="#32CD32"
                strokeWidth="2"
              />
              <line
                x1="170"
                y1="150"
                x2="165"
                y2="145"
                stroke="#32CD32"
                strokeWidth="2"
              />
              <line
                x1="190"
                y1="150"
                x2="195"
                y2="145"
                stroke="#32CD32"
                strokeWidth="2"
              />
              <circle cx="165" cy="145" r="3" fill="#32CD32" />
              <circle cx="195" cy="145" r="3" fill="#32CD32" />
            </svg>
            <p className="text-blue-300 text-sm text-center mt-2 font-bold">
              Uzay Teması 🚀🪐
            </p>
          </div>

          {/* Example 4 - Under the Sea */}
          <div className="bg-gray-900 rounded-xl p-4 border-4 border-cyan-400/50 relative">
            <div className="absolute bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 opacity-50"></div>
            <svg viewBox="0 0 350 200" className="w-full">
              <rect width="350" height="200" fill="#1a2a3a" />
              <text
                x="10"
                y="25"
                fill="#00CED1"
                fontSize="18"
                fontWeight="bold"
              >
                DENİZ ALTINDA
              </text>

              {/* Fish 1 */}
              <ellipse
                cx="80"
                cy="80"
                rx="25"
                ry="15"
                fill="none"
                stroke="#FFA500"
                strokeWidth="2"
              />
              <path
                d="M 55 80 L 45 70 L 45 90 Z"
                fill="none"
                stroke="#FFA500"
                strokeWidth="2"
              />
              <circle cx="90" cy="77" r="2" fill="#FFA500" />
              <path d="M 70 75 L 75 70" stroke="#FFA500" strokeWidth="1" />
              <path d="M 70 85 L 75 90" stroke="#FFA500" strokeWidth="1" />

              {/* Fish 2 */}
              <ellipse
                cx="280"
                cy="120"
                rx="20"
                ry="12"
                fill="none"
                stroke="#FF69B4"
                strokeWidth="2"
              />
              <path
                d="M 300 120 L 310 110 L 310 130 Z"
                fill="none"
                stroke="#FF69B4"
                strokeWidth="2"
              />
              <circle cx="272" cy="118" r="2" fill="#FF69B4" />

              {/* Octopus */}
              <circle
                cx="170"
                cy="100"
                r="20"
                fill="none"
                stroke="#9370DB"
                strokeWidth="2"
              />
              <circle cx="165" cy="95" r="2" fill="#9370DB" />
              <circle cx="175" cy="95" r="2" fill="#9370DB" />
              <path
                d="M 165 105 Q 170 108 175 105"
                fill="none"
                stroke="#9370DB"
                strokeWidth="2"
              />

              {/* Tentacles */}
              <path
                d="M 155 115 Q 150 130 145 145"
                fill="none"
                stroke="#9370DB"
                strokeWidth="2"
              />
              <path
                d="M 162 118 Q 160 135 158 150"
                fill="none"
                stroke="#9370DB"
                strokeWidth="2"
              />
              <path
                d="M 170 120 Q 170 140 170 155"
                fill="none"
                stroke="#9370DB"
                strokeWidth="2"
              />
              <path
                d="M 178 118 Q 180 135 182 150"
                fill="none"
                stroke="#9370DB"
                strokeWidth="2"
              />
              <path
                d="M 185 115 Q 190 130 195 145"
                fill="none"
                stroke="#9370DB"
                strokeWidth="2"
              />

              {/* Seaweed */}
              <path
                d="M 40 180 Q 35 160 40 140 Q 45 120 40 100"
                fill="none"
                stroke="#32CD32"
                strokeWidth="2"
              />
              <path
                d="M 50 180 Q 55 160 50 140 Q 45 120 50 100"
                fill="none"
                stroke="#32CD32"
                strokeWidth="2"
              />

              <path
                d="M 300 180 Q 295 160 300 140 Q 305 120 300 100"
                fill="none"
                stroke="#00CED1"
                strokeWidth="2"
              />
              <path
                d="M 310 180 Q 315 160 310 140 Q 305 120 310 100"
                fill="none"
                stroke="#00CED1"
                strokeWidth="2"
              />

              {/* Bubbles */}
              <circle
                cx="120"
                cy="60"
                r="4"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <circle
                cx="230"
                cy="70"
                r="3"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <circle
                cx="200"
                cy="50"
                r="5"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <circle
                cx="90"
                cy="40"
                r="3"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <circle
                cx="260"
                cy="45"
                r="4"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />

              {/* Starfish */}
              <path
                d="M 250 165 L 255 155 L 260 165 L 255 170 Z"
                fill="none"
                stroke="#FFD700"
                strokeWidth="2"
              />
              <path
                d="M 245 160 L 255 155 L 265 160"
                fill="none"
                stroke="#FFD700"
                strokeWidth="2"
              />
              <path
                d="M 248 170 L 255 170 L 262 170"
                fill="none"
                stroke="#FFD700"
                strokeWidth="2"
              />
            </svg>
            <p className="text-cyan-300 text-sm text-center mt-2 font-bold">
              Deniz Altı 🐠🐙
            </p>
          </div>
        </div>
      </div>

      {/* Package Contents */}
      <div className="px-4 py-4">
        <h2 className="font-bold text-lg text-gray-800 mb-3">
          📦 Paket İçeriği
        </h2>
        <div className="bg-green-50 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span className="text-gray-700">1 Adet Floki LED Tablet</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span className="text-gray-700">6 Adet Renkli Fosforlu Kalem</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span className="text-gray-700">USB Şarj Kablosu</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span className="text-gray-700">Silme Bezi</span>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="px-4 py-4 bg-gray-50">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white p-3 rounded-xl">
            <div className="text-2xl">🚚</div>
            <p className="text-xs text-gray-600 mt-1">Ücretsiz Kargo</p>
          </div>
          <div className="bg-white p-3 rounded-xl">
            <div className="text-2xl">💳</div>
            <p className="text-xs text-gray-600 mt-1">Kapıda Ödeme</p>
          </div>
          <div className="bg-white p-3 rounded-xl">
            <div className="text-2xl">⭐</div>
            <p className="text-xs text-gray-600 mt-1">Garantili Ürün</p>
          </div>
        </div>
      </div>

      {/* Order Form */}
      <div className="px-4 py-6 bg-gradient-to-b from-orange-50 to-orange-100">
        <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-orange-200">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
            🛒 SİPARİŞ FORMU
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Ad Soyad
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-orange-400"
                placeholder="Adınız Soyadınız"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Telefon
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-orange-400"
                placeholder="05XX XXX XX XX"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Şehir
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-orange-400"
                placeholder="İstanbul"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Adres
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows="2"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-orange-400 resize-none"
                placeholder="Açık adresiniz"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Adet Seçimi *
              </label>
              <div className="space-y-2">
                <label
                  className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer ${
                    formData.quantity === "1"
                      ? "bg-blue-50 border-blue-400"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="quantity"
                      value="1"
                      checked={formData.quantity === "1"}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-800">
                      1 ADET LED IŞIKLI ÇİZİM TABLETİ
                    </span>
                  </div>
                  <span className="font-bold text-gray-800">699 TL</span>
                </label>

                <label
                  className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer ${
                    formData.quantity === "2"
                      ? "bg-blue-50 border-blue-400"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="quantity"
                      value="2"
                      checked={formData.quantity === "2"}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-800">
                      2 ADET LED IŞIKLI ÇİZİM TABLETİ
                    </span>
                  </div>
                  <span className="font-bold text-gray-800">1.299 TL</span>
                </label>

                <label
                  className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer ${
                    formData.quantity === "3"
                      ? "bg-blue-50 border-blue-400"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="quantity"
                      value="3"
                      checked={formData.quantity === "3"}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-800">
                      3 ADET LED IŞIKLI ÇİZİM TABLETİ
                    </span>
                  </div>
                  <span className="font-bold text-gray-800">1.699 TL</span>
                </label>
              </div>
              <p className="text-gray-500 text-xs mt-2">* Kargo ücretsiz</p>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                50 ADET BECERİ ARTTIRICI ÖZEL ŞABLON (+249 TL) *
              </label>
              <div className="space-y-2">
                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer ${
                    formData.customTemplate === "yes"
                      ? "bg-purple-50 border-purple-400"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="customTemplate"
                    value="yes"
                    checked={formData.customTemplate === "yes"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-800">İSTİYORUM</span>
                </label>

                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer ${
                    formData.customTemplate === "no"
                      ? "bg-purple-50 border-purple-400"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="customTemplate"
                    value="no"
                    checked={formData.customTemplate === "no"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-800">İSTEMİYORUM</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Ödeme Yöntemi
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer ${
                    formData.paymentMethod === "cash"
                      ? "bg-orange-100 border-orange-400"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <span className="text-xl">💵</span>
                  <span className="font-medium text-gray-800">Nakit</span>
                </label>
                <label
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer ${
                    formData.paymentMethod === "card"
                      ? "bg-orange-100 border-orange-400"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <span className="text-xl">💳</span>
                  <span className="font-medium text-gray-800">Kart</span>
                </label>
              </div>
              <p className="text-gray-500 text-xs mt-2 text-center">
                * Kapıda ödeme yapılacaktır
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 mt-4">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Floki Tablet ({formData.quantity} adet)</span>
                <span>
                  {formData.quantity === "1"
                    ? "699"
                    : formData.quantity === "2"
                    ? "1.299"
                    : "1.699"}{" "}
                  TL
                </span>
              </div>
              {formData.customTemplate === "yes" && (
                <div className="flex justify-between text-gray-600 text-sm mt-1">
                  <span>Özel Şablon (50 adet)</span>
                  <span>249 TL</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600 text-sm mt-1">
                <span>Kargo</span>
                <span className="text-green-600">Ücretsiz</span>
              </div>
              <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold text-lg">
                <span>Toplam</span>
                <span className="text-orange-600">
                  {calculateTotal().toLocaleString("tr-TR")} TL
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg cursor-pointer"
            >
              SİPARİŞİ TAMAMLA
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white text-center py-4 text-sm">
        <p>© 2026 Floki Tablet</p>
        <p className="text-gray-400 text-xs mt-1">
          Kapıda Nakit veya Kart ile Ödeme
        </p>
      </div>
    </div>
  );
}

export default App;
