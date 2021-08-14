const {pool} = require('../controllers/index.controller.js');

const getClients = async (req, res) => {
    const response = await pool.query('SELECT * FROM Clients');
    res.status(200).json(response.rows);
};

const createClient = async (req, res) => {
    const { name, email, phone, identification, type} = req.body;
    const response = await pool.query('INSERT INTO Clients (name, email, phone, identification, type) VALUES ($1, $2, $3, $4, $5)', [name, email, phone, identification, type]);
    console.log(response.rows);
    return res.json({
        message: 'Client Added successfully',
        body: {
            user: {name, email, phone}
        }
    })
};

const updateClient = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, phone, identification } = req.body;

    const response =await pool.query('UPDATE Clients SET name = $1, email = $2, phone = $3, identification = $4 WHERE pk_client_id = $5', [
        name,
        email,
        phone,
        identification,
        id
    ]);
    return res.json('Client Updated Successfully');
};

const getNaturalClients = async (req, res) => {
    const response = await pool.query('SELECT * FROM Clients WHERE type = $1', ['Natural']);
    res.status(200).json(response.rows);
};

const getLegalClients = async (req, res) => {
    const response = await pool.query('SELECT * FROM Clients WHERE type = $1', ['Legal']);
    res.status(200).json(response.rows);
};


module.exports = {
    getClients,
    createClient,
    updateClient,
    getNaturalClients,
    getLegalClients,
};
