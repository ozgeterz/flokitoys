import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import productBanner from "../assets/product-banner.jpg";
import { turkishCitiesAndDistricts } from "../data/turkishCities";

function DigitalTarti() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "+90 ",
    address: "",
    city: "",
    district: "",
    paymentMethod: "cash",
    quantity: "1",
  });
  const [districts, setDistricts] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const formRef = useRef(null);

  const handlePageClick = () => {
    if (formRef.current) {
      const elementPosition = formRef.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - window.innerHeight / 2 + 270;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const formatPhoneNumber = (value) => {
    let cleaned = value.replace(/\D/g, "");

    if (cleaned.startsWith("90")) {
      cleaned = cleaned.slice(2);
    }

    if (cleaned.startsWith("0")) {
      cleaned = cleaned.slice(1);
    }

    if (cleaned.length === 0) {
      return "+90 ";
    } else if (cleaned.length <= 3) {
      return `+90 ${cleaned}`;
    } else if (cleaned.length <= 6) {
      return `+90 ${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else if (cleaned.length <= 8) {
      return `+90 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(
        6
      )}`;
    } else {
      return `+90 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(
        6,
        8
      )} ${cleaned.slice(8, 10)}`;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "city") {
      setFormData((prev) => ({ ...prev, [name]: value, district: "" }));
      setDistricts(turkishCitiesAndDistricts[value] || []);
    } else if (name === "phone") {
      const formatted = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const calculateTotal = () => {
    const prices = { 1: 700, 2: 1200, 3: 1600 };
    return prices[formData.quantity] || 700;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formId = import.meta.env.VITE_GOOGLE_FORM_ID;
    if (!formId) return;
    console.log(formId);
    const baseUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

    const quantityText =
      formData.quantity === "1"
        ? "1 ADET DİJİTAL YAĞ SU KAS VÜCUT KİTLE ENDEKSİ ÖLÇER TARTI"
        : formData.quantity === "2"
        ? "2 ADET DİJİTAL YAĞ SU KAS VÜCUT KİTLE ENDEKSİ ÖLÇER TARTI"
        : "3 ADET DİJİTAL YAĞ SU KAS VÜCUT KİTLE ENDEKSİ ÖLÇER TARTI";

    const paymentText =
      formData.paymentMethod === "cash" ? "Kapıda Nakit" : "Kapıda Kart";

    const body = new URLSearchParams({
      "entry.2137149469": formData.name,
      "entry.1363404741": formData.phone,
      "entry.1369833272": formData.city,
      "entry.271616187": formData.district,
      "entry.1325150466": formData.address,
      "entry.1998382733": quantityText,
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

    navigate("/tesekkurler");
  };

  if (orderSuccess) {
    navigate("/tesekkurler");
    return null;
  }

  return (
    <div
      className="min-h-screen bg-white w-full max-w-[390px] mx-auto"
      onClick={handlePageClick}
    >
      <div className="bg-gradient-to-b from-sky-50 to-sky-100">
        <div className="bg-white shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]">
          <img
            src={productBanner}
            alt="Dijital Yağ Su Kas Vücut Kitle Endeksi Ölçer Tartı"
            className="w-full mb-4"
          />
          <div className="px-4 pb-4">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
              🛒 SİPARİŞ FORMU
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div ref={formRef}>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-sky-400"
                  placeholder="Adınız Soyadınız"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Telefon
                </label>
                <div className="flex items-center w-full border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-sky-400">
                  <span className="bg-gray-100 px-4 py-3 text-gray-600 font-medium select-none">
                    +90
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone.replace("+90 ", "")}
                    onChange={handleInputChange}
                    required
                    className="flex-1 px-2 py-3 text-gray-800 focus:outline-none"
                    placeholder="5XX XXX XX XX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  İl
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-sky-400 bg-white"
                >
                  <option value="">İl Seçiniz</option>
                  {Object.keys(turkishCitiesAndDistricts).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  İlçe
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.city}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-sky-400 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">İlçe Seçiniz</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
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
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-sky-400 resize-none"
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
                      <span className="text-gray-800 text-[13px] leading-snug flex-1">
                        1 ADET DİJİTAL YAĞ SU KAS VÜCUT KİTLE ENDEKSİ ÖLÇER
                        TARTI
                      </span>
                    </div>
                    <span className="font-bold text-gray-800">700 TL</span>
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
                      <span className="text-gray-800 text-[13px] leading-snug flex-1">
                        2 ADET DİJİTAL YAĞ SU KAS VÜCUT KİTLE ENDEKSİ ÖLÇER
                        TARTI
                      </span>
                    </div>
                    <span className="font-bold text-gray-800">1.200 TL</span>
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
                      <span className="text-gray-800 text-[13px] leading-snug flex-1">
                        3 ADET DİJİTAL YAĞ SU KAS VÜCUT KİTLE ENDEKSİ ÖLÇER
                        TARTI
                      </span>
                    </div>
                    <span className="font-bold text-gray-800">1.600 TL</span>
                  </label>
                </div>
                <p className="text-gray-500 text-xs mt-2">* Kargo ücretsiz</p>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Ödeme Yöntemi
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer ${
                      formData.paymentMethod === "cash"
                        ? "bg-sky-100 border-sky-400"
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
                    <span className="font-medium text-gray-800">
                      Kapıda Nakit
                    </span>
                  </label>
                  <label
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer ${
                      formData.paymentMethod === "card"
                        ? "bg-sky-100 border-sky-400"
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
                    <span className="font-medium text-gray-800">
                      Kapıda Kart
                    </span>
                  </label>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 mt-4">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Dijital Tartı ({formData.quantity} adet)</span>
                  <span>
                    {(formData.quantity === "1"
                      ? 700
                      : formData.quantity === "2"
                      ? 1200
                      : 1600
                    ).toLocaleString("tr-TR")}{" "}
                    TL
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm mt-1">
                  <span>Kargo</span>
                  <span className="text-green-600">Ücretsiz</span>
                </div>
                <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold text-lg">
                  <span>Toplam</span>
                  <span className="text-blue-600">
                    {calculateTotal().toLocaleString("tr-TR")} TL
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg cursor-pointer"
              >
                SİPARİŞİ TAMAMLA
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 text-white text-center py-4 text-sm">
        <p>© 2026 Comedones Tartı</p>
        <p className="text-gray-400 text-xs mt-1">
          Kapıda Nakit veya Kart ile Ödeme
        </p>
      </div>
    </div>
  );
}

export default DigitalTarti;
