const cors = require('cors');

const setupCors = (app) => {
    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    }));
};

module.exports = setupCors;
