const mysql = require('mysql2/promise');

async function db_Connect() {
    const connection = await mysql.createConnection({
        host: 'localhost', 
        user: 'root',      
        password: '', 
        database: 'welding_join_history_ks',
    });
      
    try {
        await connection.connect();
        console.log('Connected to Database');
        return connection; // Kembalikan objek koneksi
    } catch (error) {
        console.error('Error connecting to Database:', error.message);
        throw error; // Lempar kembali error untuk penanganan lebih lanjut
    }
}

module.exports = {
    db_Connect,
};
