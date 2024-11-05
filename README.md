# Nod Face Detection

Ini adalah proyek aplikasi web berbasis Node.js dan Express yang menggunakan face-api.js untuk mendeteksi ekspresi wajah, estimasi umur, dan jenis kelamin.

## Instalasi

**Clone repository ini** ke lokal anda:

   Jalankan perintah berikut di terminal anda:

   ```bash
   git clone https://github.com/StevOng/DevOps_Nod_Project.git
   ```

   Pindah ke folder yang anda clone tadi:

   ```bash
   cd DevOps_Nod_Project
   ```

## Menjalankan Aplikasi Web

**Menjalankan dengan docker-compose**:

  Jalankan perintah berikut di terminal:

   ```bash
   docker compose up
   ```

   Untuk menghentikan layanan yang berjalan dengan docker-compose, Anda bisa menggunakan perintah berikut:

   ```bash
   docker compose down -v
   ```

   Perintah ini akan menghentikan dan menghapus semua container, network, dan volume yang dibuat oleh **docker compose up**.

## Teknologi yang digunakan

**Node.js & Express**-Framework server-side JavaScript.

**face-api.js**-API JavaScript untuk face detection di browser.

**Docker**-Containerization untuk kemudahan deploy.
