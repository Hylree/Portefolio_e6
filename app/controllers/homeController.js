/** On importe les librairies */

/** On importe les modèles */


/** On déclare les fonctions */

const viewHome = (req, res) => {
    
    res.render('index');
}

module.exports = {
    viewHome : viewHome
};