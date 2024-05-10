const nodemailer = require('nodemailer');
const { Users } = require('../../db'); 
const {FRONTURL} = process.env

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

  const { id, url } = req.query;
  
    // Verificar que id y url existen
  if (!id || !url) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos' });

  }

  const user = await Users.findOne({ where: { id } });

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  
  const verificationToken = user.verification_token;
  const userName = user.name.replace(/\s+/g, '');

    // Verificar que verificationToken y userName existen
  if (!verificationToken || !userName) {
    console.log("entre aqui");
    return res.status(400).json({ error: 'Faltan datos del usuario' });
  }


  try {
    const sendingEmail = await transporter.sendMail({
      from: 'hmusic.proyecto@mail.ee',
      to: user.email,
      subject: 'Henry Music - Verificación de correo electrónico',
      html:`<!DOCTYPE html>
      <html lang="es">
      
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
      
          <title>Henry Music Invoice</title>
      
      </head>
      
      <body style="letter-spacing: -0.3px;font-weight: 600;">
          <div
              style="width: 500px;margin: auto;border: 2px solid #000;padding: 20px;box-shadow: 0px 0px 10px rgba(0,0,0,0.1);background-color: #171717;border-radius: 15px;display: block;clear: both; hover: 0px 0px 10px rgba(0,0,0,0.2);">
              <div style="display: block;clear: both;color: #ffffff; margin: 30px">
                  <div>
                      <div style="display: flex; justify-content: center;">
                          <h1 style="background-color: rgb(255, 196, 0); padding: 20px; border-radius: 15px;color:#000">
                              HENRY
                              MUSIC</h1>
                      </div>
                      <div style="margin-top: 20px;">
                          De
                          <address>
                              <strong>H MUSIC</strong>
                              <br>
                                  Email: hmusic.proyecto@mail.ee
                          </address>
                      </div>
                      <div style="margin-top: 20px;">
                          Para
                          <address>
                              <strong style="text-transform: uppercase;">${user.name}</strong><br>
      
                              Email: ${user.email}
                          </address>
                      </div>
                  </div>
                  <br><br>
                  <div style="display: block;clear: both;">
                      <span style="color: #ffffff;"> Muchas gracias por registrate en Henry Music!</span>
                      <br><br>
                      <span style="color: #ffffff;"> Para verificar email presione el boton!</span>
                  </div>
                  <br>
                  <br>
                  <br>
                        <div style="display: flex; justify-content: center; ">
                        <a href="${FRONTURL}/${url}/${userName}?id=${id}&token=${verificationToken}" style="text-decoration: none;">
                          <button style="padding: 15px; background-color: #ffffff;border-radius: 10px;background-color: rgb(255, 196, 0); hover: 0px 0px 10px rgba(0,0,0,0.2);">
                            <strong>H MUSIC</strong>
                          </button>
                        </a>
                  </div>
                  <br>
              </div>
          </div>
      </body>
      
      </html>`
      
      //`Por favor, verifica tu correo electrónico siguiendo el siguiente enlace: 
      //${FRONTURL}/${url}/${userName}?id=${id}&token=${verificationToken}`,
    });

    res.status(200).json(sendingEmail);
    
} catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).json({ error: error.message});
  }
};

module.exports = verification;