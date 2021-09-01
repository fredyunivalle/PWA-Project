const {pool} = require('./index.controller.js');



const getAudios = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM TaskAudios WHERE fk_task_id = $1', [id]);
    res.status(200).json(response.rows);
};

const uploadAudio = async (req, res) => {
    const taskId = parseInt(req.params.id);
    const path = req.file.path;
    const response = await pool.query('INSERT INTO TaskAudios (path, fk_task_id) VALUES ($1, $2)', [path, taskId]);
    res.json({
        message: 'Audio Added successfully',
        body: {
            user: {path}
        }
    })
};

const deleteAudio = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM TaskAudios WHERE pk_id = $1', [id]);
    res.json(`Audio ${id} deleted Successfully`);
};

module.exports = {
    getAudios,
    uploadAudio,
    deleteAudio
};