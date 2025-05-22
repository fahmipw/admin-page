const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Tampilkan halaman utama
router.get('/', (req, res) => {
  db.query('SELECT * FROM produk', (err, products) => {
    if (err) throw err;

    db.query('SELECT pembelian.*, produk.nama_produk FROM pembelian JOIN produk ON pembelian.produk_id = produk.id WHERE status = "pending"', (err, pembelian) => {
      if (err) throw err;
      res.render('index', { products, pembelian });
    });
  });
});

// Proses pembelian
router.post('/pembelian', (req, res) => {
  const { produk_id, jumlah } = req.body;
  db.query('SELECT harga FROM produk WHERE id = ?', [produk_id], (err, results) => {
    if (err) throw err;
    const harga = results[0].harga;
    const total = harga * jumlah;

    db.query('INSERT INTO pembelian (produk_id, jumlah, total_harga) VALUES (?, ?, ?)', [produk_id, jumlah, total], (err) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
});

// Cancel pembelian
router.post('/cancel/:id', (req, res) => {
  const id = req.params.id;
  db.query('UPDATE pembelian SET status = "cancelled" WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = router;
