
import { Router } from "express";
import { getUser, register_accept_policy, register_refuse_policy, verifyPolicy } from './controller/user_controller.js';
import transporter from "../config/nodemailer.js";

const route = Router();

route.get('/user/:id', getUser)
route.post('/accept', register_accept_policy)
route.post('/refuse', register_refuse_policy)
route.get('/verify/:id', verifyPolicy)

route.post('/send', async (req, res) => {
    const { gmail, name } = req.body;

    await transporter.sendMail({
        from: '"Enkador" <yuli.roman1404@gmail.com>', // el que va enviar el correo
        to: gmail, // para quien va a ir el corrreo electronico.
        //   subject: "Hello ✔", // Subject line
        subject: "Hello world?", // texto plano
        html: `
        <h1>${name}</h1>
        <p>Mensaje enviado </p>`,
    }); // css por dentro del html      
})
export default route;