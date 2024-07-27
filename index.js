require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user');
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middlewares/auth');

const app = express();

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 день
    }
}));

app.use(cors({
    origin: process.env.CLIENT_URL, // Укажи URL фронтенда
    credentials: true // Важно для передачи куки
}));
app.use(morgan('dev'));
app.use(express.json());

// Маршруты авторизации должны идти до применения глобального middleware
app.use('/api/auth', authRoutes);

// Применение глобального middleware
app.use(authMiddleware);

// Применение маршрутов после middleware
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await sequelize.authenticate();
    console.log('Database connected!');
});
