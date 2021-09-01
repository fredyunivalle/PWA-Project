const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'pandemanteca4444',
    database: 'PwaProject',
    port: '5432'
});

//password: 'pandemanteca4444',

module.exports = {
    pool
};

