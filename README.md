# 🛠️ Vue 3 Admin Panel

Vue 3, TypeScript, Pinia, Vue Router ve Ant Design Vue kullanılarak geliştirilmiş modern, ölçeklenebilir bir yönetim paneli projesidir.

Canlı demo: https://funny-gingersnap-bb13a7.netlify.app/

## 🚀 Özellikler

- ✅ Vue 3 Composition API
- ✅ TypeScript desteği
- ✅ Vue Router ile sayfa yönetimi
- ✅ Pinia ile global state yönetimi
- ✅ Ant Design Vue UI bileşenleri
- ✅ Sidebar daraltma/genişletme
- ✅ i18n ile çoklu dil desteği
- ✅ Responsive tasarım
- ✅ Dinamik sayfa başlıkları
- ✅ Nested route

## 📦 Kullanılan Kütüphaneler

### 🔹 [Ant Design Vue](https://www.antdv.com/docs/vue/introduce/)
Ant Design Vue, Vue.js için geliştirilmiş bir UI bileşen kütüphanesidir. Kullanıcı dostu ve modern bir arayüz oluşturmak için Ant Design Vue bileşenleri kullanılmıştır.

- Bileşenler: Butonlar, formlar, tablolar ve daha fazlası

### 🔹 [Ant Design Icons Vue](https://www.npmjs.com/package/@ant-design/icons-vue)
Ant Design Icons Vue, Ant Design UI kütüphanesindeki ikonları Vue 3 ile kullanmanızı sağlar. Proje içinde ikonlar için bu kütüphane tercih edilmiştir.

### 🔹 [Axios](https://axios-http.com/)
Axios, HTTP istekleri yapmak için kullanılan bir kütüphanedir. API ile etkileşimde bulunarak verileri almak ve göndermek için Axios kullanılmıştır.

### 🔹 [Pinia](https://pinia.vuejs.org/)
Pinia, Vue 3 için modern bir durum yönetimi kütüphanesidir. Projeye veri paylaşımı ve yönetimi amacıyla kullanılmıştır. Vuex'e alternatif olarak tercih edilmiştir.

### 🔹 [Sass Embedded](https://sass-lang.com/)
Sass Embedded, Sass (Syntactically Awesome Style Sheets) için bir CSS ön işleyicisidir. Proje stilizasyonu için SCSS kullanılmıştır.

### 🔹 [ECharts](https://echarts.apache.org/)
ECharts, görsel veri görselleştirmesi ve etkileşimli grafikler oluşturmak için kullanılan bir JavaScript kütüphanesidir. Proje içerisinde verilerin görselleştirilmesinde ECharts kullanılmıştır.

## 🔧 Kurulum

1. **.env Dosyası**
    - `.env` dosyasını kök dizine oluşturun.
    - Aşağıdaki gibi yapılandırın:

   ```env
   VITE_API_URL=https://dummyjson.com/
   VITE_DEFAULT_LOCALE=tr

2. **Bağımlılıkları Yükleyin**
    
    ```bash
    # Bağımlılıkları yükle
    npm install
    
    # Geliştirme sunucusunu başlat
    npm run dev
