const {pool} = require('./index.controller.js');



const getImages = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM TaskImages WHERE fk_task_id = $1', [id]);
    res.status(200).json(response.rows);
};

const uploadImage = async (req, res) => {
    const taskId = parseInt(req.params.id);
    const path = req.file.path;
    const response = await pool.query('INSERT INTO TaskImages (path, fk_task_id) VALUES ($1, $2)', [path, taskId]);
    res.json({
        message: 'Image Added successfully',
        body: {
            user: {path}
        }
    })
};

const deleteImage = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM TaskImages WHERE pk_id = $1', [id]);
    res.json(`Image ${id} deleted Successfully`);
};

module.exports = {
    getImages,
    uploadImage,
    deleteImage
};