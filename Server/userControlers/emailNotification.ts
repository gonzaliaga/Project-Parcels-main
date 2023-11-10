import nodemailer from 'nodemailer'

import { Request, Response}  from 'express'

const emailNotification = async (req: Request, res: Response) => {

    const {email, asunto, cuerpo} = req.body;

    const config = {
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
            user: 'ecommerceparcelas@gmail.com',
            pass: "ebsaiiorklbybvzn",
        },
        tls: {
            rejectUnauthorized: false,
        }
    }
    const mensaje = {
        from: 'ecommerceparcelas@gmail.com',
        to: email,
        subject : asunto,
        text: cuerpo
    }

    const transport = nodemailer.createTransport(config);

    try {
        transport.sendMail(mensaje, (error, info) => {
            if(error) {
            res.status(400).json({message: 'Error al enviar el correo'})

            }else {
                res.status(200).json({message: "correo enviado: "})                
            }
         })
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }

}
export default emailNotification