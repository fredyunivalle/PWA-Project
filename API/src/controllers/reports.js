const {pool} = require('./index.controller.js');

const getUserByPosition = () =>{
    const response = await pool.query('SELECT position, count(*) as users from users group by position');
    res.status(200).json(response.rows);
};


module.exports = {
    getUserByPosition,
}