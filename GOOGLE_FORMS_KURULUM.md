# Google Forms Kurulum Rehberi (3 Dakika)

## Adım 1: Google Forms Oluştur

1. https://forms.google.com/ adresine git
2. "+" butonuna tıkla (Boş form)
3. Form başlığı: "Floki Tablet Sipariş Formu"

## Adım 2: Form Alanlarını Ekle

Sırayla şu alanları ekle:

1. **Ad Soyad**

   - Tür: Kısa yanıt
   - Zorunlu: ✓

2. **Telefon**

   - Tür: Kısa yanıt
   - Zorunlu: ✓

3. **Şehir**

   - Tür: Kısa yanıt
   - Zorunlu: ✓

4. **Adres**

   - Tür: Paragraf
   - Zorunlu: ✓

5. **Adet Seçimi**

   - Tür: Çoktan seçmeli
   - Seçenekler:
     - 1 ADET LED IŞIKLI ÇİZİM TABLETİ - KARGO ÜCRETSİZ: 699 TL
     - 2 ADET LED IŞIKLI ÇİZİM TABLETİ - KARGO ÜCRETSİZ: 1.299 TL
     - 3 ADET LED IŞIKLI ÇİZİM TABLETİ - KARGO ÜCRETSİZ: 1.699 TL
   - Zorunlu: ✓

6. **50 ADET BECERİ ARTTIRICI ÖZEL ŞABLON (+249 TL)**

   - Tür: Çoktan seçmeli
   - Seçenekler:
     - İSTİYORUM
     - İSTEMİYORUM
   - Zorunlu: ✓

7. **Ödeme Yöntemi**
   - Tür: Çoktan seçmeli
   - Seçenekler:
     - Kapıda Nakit
     - Kapıda Kart
   - Zorunlu: ✓

## Adım 3: Yanıtları Google Sheets'e Bağla

1. Formda "Yanıtlar" sekmesine tıkla
2. Yeşil Sheets simgesine tıkla
3. "Yeni e-tablo oluştur" seç
4. "Oluştur" butonuna tıkla
5. Otomatik olarak Google Sheets açılacak - tüm siparişler burada!

## Adım 4: Form Embed Kodunu Al

1. Formda sağ üstteki "Gönder" butonuna tıkla
2. **<> (Embed HTML)** simgesine tıkla
3. Genişlik: 390, Yükseklik: 800
4. **HTML kodunu kopyala** (iframe ile başlayan kod)
   - Örnek: `<iframe src="https://docs.google.com/forms/d/e/1FAIpQL..."></iframe>`

## Adım 5: Form ID ve Entry ID'lerini Bul

### Form ID'sini Bul:

1. Formda sağ üstteki "Gönder" > "<> Embed HTML" tıkla
2. iframe kodundaki URL'ye bak
3. `/d/e/` ile `/viewform` arasındaki kısım Form ID'dir

Örnek:

```
https://docs.google.com/forms/d/e/1FAIpQLSe_ABC123XYZ/viewform
```

Form ID: `1FAIpQLSe_ABC123XYZ`

### Entry ID'lerini Bul (ÖNEMLİ!):

1. Formunu önizleme modunda aç (göz simgesi)
2. Sayfaya sağ tıkla > "Öğeyi İncele" (Inspect)
3. Console sekmesine geç
4. Şu kodu yapıştır ve Enter'a bas:

```javascript
document.querySelectorAll('input[name^="entry."]').forEach((input) => {
  const label = input.closest(".Qr7Oae").querySelector(".M7eMe");
  console.log(label ? label.textContent : "Label yok", ":", input.name);
});
```

5. Console'da her alan için entry ID'leri göreceksin:

```
Ad Soyad : entry.123456789
Telefon : entry.987654321
Şehir : entry.111222333
...
```

## Adım 6: Bilgileri Projeye Ekle

`.env` dosyasını aç ve bilgileri ekle:

```
VITE_GOOGLE_FORM_ID=1FAIpQLSe_ABC123XYZ
```

Sonra `src/App.jsx` dosyasında 38-44. satırlardaki entry ID'leri güncelle:

- `entry.name` yerine Ad Soyad'ın entry ID'si
- `entry.phone` yerine Telefon'un entry ID'si
- `entry.city` yerine Şehir'in entry ID'si
- `entry.address` yerine Adres'in entry ID'si
- `entry.quantity` yerine Adet Seçimi'nin entry ID'si
- `entry.template` yerine Özel Şablon'un entry ID'si
- `entry.payment` yerine Ödeme Yöntemi'nin entry ID'si

Örnek:

```javascript
const params = new URLSearchParams({
  "entry.123456789": formData.name, // Ad Soyad
  "entry.987654321": formData.phone, // Telefon
  // ... diğerleri
});
```

## Adım 7: Sunucuyu Yeniden Başlat

Terminal'de: `npm run dev`

## Bitti! 🎉

Artık:

- Her sipariş Google Forms'a gidecek
- Otomatik olarak Google Sheets'e kaydedilecek
- Excel gibi kullanabilirsin
- Grafik ve analiz yapabilirsin
- Tamamen ücretsiz!

## Google Sheets'te Göreceğin Veriler:

- Zaman damgası (otomatik)
- Ad Soyad
- Telefon
- Şehir
- Adres
- Adet Seçimi
- Özel Şablon
- Ödeme Yöntemi

Tüm siparişler otomatik olarak tabloya eklenecek!
