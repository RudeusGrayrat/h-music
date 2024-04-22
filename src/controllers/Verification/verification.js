const nodemailer = require('nodemailer');
const { Users } = require('../../db'); 

const transporter = nodemailer.createTransport({
  host: 'mail.mail.ee',
  prot: 587,
  secure: false,
  auth: {
    user: 'hmusic.proyecto@mail.ee',
    pass: 'D?YHfq9P!m'
  }
});

const verification = async (req, res) => {

  const { id } = req.query;

  const user = await Users.findOne({ where: { id } });

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const verificationToken = user.verification_token;
  const userName = user.name.replace(/\s+/g, '');

  try {
    const sendingEmail = await transporter.sendMail({
      from: 'hmusic.proyecto@mail.ee',
      to: user.email,
      subject: 'Henry Music - Verificación de correo electrónico',
      text: `Por favor, verifica tu correo electrónico siguiendo el siguiente enlace: 
      http://localhost:3000/verification/${userName}?id=${id}&token=${verificationToken}`,
    });

    res.status(200).json(sendingEmail);
    
} catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).json({ error: error.message});
  }
};

module.exports = verification;