const express = require('express');
const { User } = require('../db/models');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        req.session.userId = user.id;

        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.password;

        req.session.save(err => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save session' });
            }
            res.status(201).json(userWithoutPassword);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        req.session.userId = user.id;

        req.session.save(err => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save session' });
            }
            const userWithoutPassword = user.toJSON();
            delete userWithoutPassword.password;

            res.status(200).json(userWithoutPassword);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out, please try again' });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

router.get('/me', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    User.findByPk(req.session.userId)
        .then(user => {
            const userWithoutPassword = user.toJSON();
            delete userWithoutPassword.password;
            return res.json(userWithoutPassword);
        })
        .catch(error => res.status(500).json({ error: error.message }));
});

module.exports = router;
