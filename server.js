const express = require('express');

/** On intancie l'application */
const app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('public'));
app.use('/res', express.static('node_modules'));

/** On créer le router Web */
const webRouter = express.Router();

const homeRouter = require('./app/routers/homeRouter');

webRouter.use('/', homeRouter);

app.use('/', webRouter);

/** On démarre l'application */
app.listen(3000, () => {
    console.log('Le serveur écoute sur le port 3000');
});