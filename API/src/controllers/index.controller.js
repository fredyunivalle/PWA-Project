const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    database: 'PwaProject',
    port: '5432'
});

//password: 'pandemanteca4444',

module.exports = {
    pool
};

