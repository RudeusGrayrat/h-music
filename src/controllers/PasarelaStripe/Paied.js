const api = process.env.APY_KEY_STRIPE
const stripe = require('stripe')(api)
const putRol = require('../Users/putRol');


const Paied = async (req, res) => {
    try {
        const {email} = req.body
        const respuesta = "aprobado";
        await putRol(email);

        return res.status(200).json(respuesta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la respuesta de pago' });
    }
};

module.exports = Paied;
