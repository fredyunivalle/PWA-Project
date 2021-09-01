const { Router } = require('express');
const router = Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

const {getUsers, getUserById, createUser, updateUser, deleteUser, login} = require('../controllers/users.js'); 
const {getClients, createClient, updateClient, getNaturalClients, getLegalClients} = require('../controllers/clients.js');
const {getProjects, createProject, updateProject, deleteProject} = require ('../controllers/projects.js'); 
const {getTasks, createTask, updateTask, deleteTask} = require ('../controllers/tasks.js'); 
const {getImages, uploadImage, deleteImage} = require ('../controllers/images.js');
const { getAudios, uploadAudio,deleteAudio } = require('../controllers/audios.js');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/login', login)
router.post('/users', createUser);
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser);

router.get('/clients', getClients);
router.post('/clients', createClient);
router.put('/clients/:id', updateClient);

router.get('/clients/natural', getNaturalClients)

router.get('/clients/legal', getLegalClients)

router.get('/projects', getProjects);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

router.get('/projects/tasks/:id', getTasks);
router.post('/projects/tasks/:id', createTask);
router.put('/projects/tasks/:id', updateTask);
router.delete('/projects/tasks/:id', deleteTask);

router.get('/projects/tasks/images/:id', getImages);
router.post('/projects/tasks/images/:id', upload.single('image'), uploadImage);
router.delete('/projects/tasks/images/:id', deleteImage);

router.get('/projects/tasks/audios/:id', getAudios);
router.post('/projects/tasks/audios/:id', upload.single('audio'), uploadAudio);
router.delete('/projects/tasks/audios/:id', deleteAudio);

module.exports = router;