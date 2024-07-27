const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const { sequelize } = require('./db/models');
require('dotenv').config();

const { initializeDbConnection, pgPool } = require('./configs/db');
const { sessionConfig } = require('./configs/session');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const todoRoutes = require('./routes/todo');
const authMiddleware = require('./middlewares/auth');

const app = express();

initializeDbConnection(pgPool);

// Middleware для разбора cookies
app.use(cookieParser());

// Настройка CSRF защиты
const csrfProtection = csrf({ cookie: true });

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session(sessionConfig(pgPool)));

// Применение CSRF защиты ко всем маршрутам
app.use(csrfProtection);

// Добавление CSRF-токена во все ответы
app.use((req, res, next) => {
    res.cookie('csrfToken', req.csrfToken());
    next();
});

app.use('/api/auth', authRoutes);
app.use(authMiddleware);
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await sequelize.authenticate();
    console.log('Database connected!');
});
