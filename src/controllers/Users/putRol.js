const { Users } = require('../../db');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'mail.mail.ee',
    prot: 587,
    secure: false,
    auth: {
      user: 'hmusic.proyecto@mail.ee',
      pass: 'D?YHfq9P!m'
    }
  });

const putRol = async (email) => {
    try {
        if (!email) {
            throw new Error('Correo electrónico no proporcionado');
        }
        const updatedUser = await Users.update(
            { rol: "premium" },
            { where: { email } }
        );

        
        await transporter.sendMail({
        from: 'hmusic.proyecto@mail.ee',
        to: email,
        subject: 'Henry Music - Se ha Confirmado tu pago',
        text: `Gracias por tu suscripcion, se ha confirmado el pago, puedes disfrutar de todos
        los beneficios de Henry - Music Premium`,
        });
            

        if (updatedUser[0] === 0) {
            throw new Error('Usuario no encontrado o rol no actualizado');
        }

    } catch (error) {
        throw error;
    }
};

module.exports = putRol;
