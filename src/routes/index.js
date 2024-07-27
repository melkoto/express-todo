const authRoutes = require('./auth');
const userRoutes = require('./user');
const todoRoutes = require('./todo');
const authMiddleware = require('../middlewares/auth');

module.exports = { authRoutes, userRoutes, todoRoutes, authMiddleware };
