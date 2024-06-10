const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const consign = require('consign');
const cors = require('cors')

module.exports = () => {
    const app = express();

    // SETANDO VARIÁVEIS DA APLICAÇÃO
    app.set('port', process.env.PORT || config.get('server.port'));

    // MIDDLEWARES
    app.use(bodyParser.json());
    app.use(cors())
    
    consign({ cwd: 'api' })
        .then('data')
        .then('controller')
        .then('routes')
        .into(app)
    return app;
};