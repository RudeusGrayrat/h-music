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

        const user = await Users.findOne({ where: { email } });

        const date = new Date(Date.now());
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;


        await transporter.sendMail({
        from: 'hmusic.proyecto@mail.ee',
        to: email,
        subject: 'Henry Music - Se ha Confirmado tu pago',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
        
            <title>Henry Music Invoice</title>
            
        </head>
        <body style="letter-spacing: -0.3px;font-weight: 600;font-family: &quot;Lucida Sans&quot;, Courier, &quot;Lucida Sans Typewriter&quot;, &quot;Lucida Typewriter&quot;, monospace !important;">
            <div style="width: 700px;margin: auto;border: 2px solid #000;padding: 20px;box-shadow: 0px 0px 10px rgba(0,0,0,0.1);background-color: #171717;border-radius: 10px;display: block;clear: both;">
                <div>
                    <div style="display: block;clear: both;">
                        <div>
                            <table style="width: 100%;border-collapse: collapse;background-color: #C99A0A;color: #ffffff;padding: 10px;border-radius: 25px;">
                                <tr>
                                    <td style="padding: 10px;vertical-align: top;">
                                        <h4>
                                            <span style="font-size: 30px;color: #000;">HENRY MUSIC</span>
                                          <br>
                                            <span style="color: #000;font-size: 15px;">Invoice</span>
                                        </h4>
                                    </td>
                                    <td style="padding: 10px;vertical-align: top;text-align: right;color: #000;font-size: 19px;">
                                        <strong>Date: ${formattedDate}</strong>
                                    </td>
                                </tr>
                                  <tr>
                                <td colspan="2" style="padding: 10px;vertical-align: top;"> 
                                <hr style="border: 2px solid #171717;border-radius: 5px;margin-top: 5px;margin-bottom: 5px;"> 
                                  </td>
                            </tr>
                            </table>
                        </div>
                    </div>
                    <br><br>
                    <div style="display: block;clear: both;">
                        <div>
                            <table style="width: 100%;border-collapse: collapse;color: #ffffff;">
                                <tr>
                                    <td style="padding: 10px;vertical-align: top;">
                                        <div>
                                            From
                                            <address>
                                                <strong>HENRY MUSIC</strong><br>
                                                
                                                Email: hmusic.proyecto@mail.ee
                                            </address>
                                        </div>
                                    </td>
                                    <td style="padding: 10px;vertical-align: top;">
                                        <div>
                                            To
                                            <address>
                                                <strong style="text-transform: uppercase;">${user.name}</strong><br>
                                             
                                                Email: ${email}
                                            </address>
                                        </div>
                                    </td>
                                    <td style="padding: 10px;vertical-align: top;">
                                        
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <br><br>
                    <div style="display: block;clear: both;">
                        <div>
                            <table style="width: 100%;border-collapse: collapse;color: #ffffff;">
                                <thead>
                                    <tr style="background: #171717;">
                                        <th style="text-align: left;padding: 10px;">Qty</th>
                                        <th style="text-align: left;padding: 10px;">Product</th>
                                        <th style="text-align: left;padding: 10px;">Description</th>
                                        <th style="text-align: left;padding: 10px;">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="padding: 10px;vertical-align: top;">1</td>
                                        <td style="padding: 10px;vertical-align: top;">1 month Premium</td>
                                        <td style="padding: 10px;vertical-align: top;">HENRY MUSIC PREMIUM</td>
                                        <td style="padding: 10px;vertical-align: top;text-align: right;color: #ffffff;font-size: 15px;">&#36; 16.80</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" style="padding: 10px;vertical-align: top;text-align: right;color: #ffffff;font-size: 15px;">Sub Total</td>
                                        <td style="padding: 10px;vertical-align: top;text-align: right;color: #ffffff;font-size: 15px;"><strong>&#36; 16.80</strong></td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" style="padding: 10px;vertical-align: top;text-align: right;color: #ffffff;font-size: 15px;">TAX (16%)</td>
                                        <td style="padding: 10px;vertical-align: top;text-align: right;color: #ffffff;font-size: 15px;"><strong>&#36; 3.20</strong></td>
                                    </tr>
                                    <tr>
                                        <td colspan="3"  style="padding: 10px;vertical-align: top;text-align: right;color: #ffffff;font-size: 15px;">Total Payable</td>
                                        <td style="padding: 10px;vertical-align: top;text-align: right;color: #ffffff;font-size: 15px;"><strong>&#36; 20</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- /.col -->
                      <small style="color: #ffffff;"> Thank you for your subscription!</small> 
                    </div>
                    <br><br><br>
                </div>
            </div>    
        </body>
        </html>`,
        });
            

        if (updatedUser[0] === 0) {
            throw new Error('Usuario no encontrado o rol no actualizado');
        }

    } catch (error) {
        throw error;
    }
};

module.exports = putRol;
