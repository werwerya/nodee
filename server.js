const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Veritabanı bağlantı bilgileri
const pool = mysql.createPool({
    host: 'localhost',
    user: 'yasar',
    password: 'yasar',
    database: 'ornekVeritabani'
});

// EJS view engine ve body-parser'ın kullanımı
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Ana sayfa
app.get('/', (req, res) => {
    res.render('index');
});

// Veri gönderme
app.post('/submit', (req, res) => {
    const data = req.body;
    pool.query('INSERT INTO ornek_tablo (mesaj) VALUES (?)', [data.veri], (error, results, fields) => {
        if (error) throw error;
        res.send('Veri başarıyla eklendi.');
    });
});

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});
