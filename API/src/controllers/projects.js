const {pool} = require('../controllers/index.controller.js');

const getProjects = async (req, res) => {
    const response = await pool.query('SELECT * FROM Projects');
    res.status(200).json(response.rows);
};

const createProject = async (req, res) => {
    const { name, description, person} = req.body;
    const response = await pool.query('INSERT INTO Projects (name, description, personInCharge) VALUES ($1, $2, $3)', [name, description, person]);
    res.json({
        message: 'Project Added successfully',
        body: {
            user: {name, description, person}
        }
    })
};

const updateProject = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, person } = req.body;

    const response =await pool.query('UPDATE Projects SET name = $1, description = $2, personInCharage = $3 WHERE pk_project_id = $4', [
        name,
        description,
        person,
        id
    ]);
    res.json('Project Updated Successfully');
};

const deleteProject = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM Projects WHERE pk_project_id = $1', [id]);
    res.json(`Project ${id} deleted Successfully`);
};

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject
};