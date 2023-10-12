import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:"yuli.roman1404@gmail.com",
        pass:"msnf ouxn ccte beqk"
    },
});

transporter
.verify()
.then(()=>console.log("gmail enviado correctamente"))
.catch((error)=> console.error(error));

export default transporter;