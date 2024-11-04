# Nod Face Detection

Ini adalah proyek website berbasis Node.js dan Express yang menggunakan face-api.js untuk mendeteksi ekspresi wajah, estimasi umur, dan jenis kelamin.

## Instalasi

1. **Clone repo ini** ke lokal Anda:

    ```bash
    git clone https://github.com/StevOng/DevOps_Nod_Project.git
    cd DevOps_Nod_Project
    ```

2. **Install dependencies** menggunakan npm:

    ```bash
    npm install
    ```

# Menjalankan Website

Anda bisa menjalankan website ini dengan dua cara: tanpa Docker atau dengan Docker.

1. **Menjalankan tanpa Docker**:

   Jika anda tidak menggunakan Docker, jalankan perintah berikut di terminal:

   ```bash
   node index
   ```

2. **Menjalankan dengan docker-compose**:

  Jika anda ingin menggunakan Docker, jalankan perintah berikut di terminal:

  ```bash
  docker-compose up
  ```

# Teknologi yang digunakan

**Node.js & Express**-Framework server-side JavaScript
**face-api.js**-API Javascript untuk face detection di browser
**Docker**-Containerization untuk kemudahan deploy