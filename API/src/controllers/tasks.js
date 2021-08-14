const {pool} = require('./index.controller.js');

const getTasks = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM Tasks WHERE fk_project_id = $1', [id]);
    res.status(200).json(response.rows);
};

const createTask = async (req, res) => {
    const projectId = parseInt(req.params.id);
    const { name, description, completed} = req.body;
    const response = await pool.query('INSERT INTO Tasks (name, description, fk_project_id, completed) VALUES ($1, $2, $3, $4)', [name, description, projectId, completed]);
    res.json({
        message: 'Task Added successfully',
        body: {
            user: {name, description}
        }
    })
};

const updateTask = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, completed } = req.body;

    const response =await pool.query('UPDATE Tasks SET name = $1, description = $2, completed = $3 WHERE pk_Task_id = $4', [
        name,
        description,
        completed,
        id
    ]);
    res.json('Task Updated Successfully');
};

const deleteTask = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM Tasks WHERE pk_task_id = $1', [id]);
    res.json(`Task ${id} deleted Successfully`);
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};