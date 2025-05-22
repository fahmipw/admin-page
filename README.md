🚀 Cara Menjalankan Aplikasi
1. Clone Repository
 
    `git clone https://github.com/fahmipw/admin-page.git`
 
    `cd admin-page`


2. Install Dependencies

   `npm install`

3. Konfigurasi Database

   Edit file `config/db.js` (buat file ini jika belum ada), isi seperti berikut :

  ```sql
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ganti sesuai konfigurasi MySQL kamu
  database: 'toko',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = db;
```



5. Jalankan Server

    `node app.js`

6. Akses di browser: 

    `http://localhost:3000`
