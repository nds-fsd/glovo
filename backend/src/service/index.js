// Revisar todo el codigo //
const formData = require ("form-data");
const Mailgun = require("mailgun.js");
const fs = require("fs");
const Handlebars = require("handlebars");
const path = require("path");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});
exports.sendWelcomeEmail = async(user) =>{
    const DOMAIN = process.env.MAILGUN_DOMAIN;
    const emailData = {
        from:'Glotón <mailgun@sandbox4c0bfce653f44017bd3898600362f788.mailgun.org>',
        to: user.email,
        subject: "Bienvenido a Glotón!"
    };
    try {
    const testEmailTemplate = fs.readFileSync(path.resolve(__dirname,"templates/welcome.handlebars"), "utf-8");
    const template = Handlebars.compile(testEmailTemplate);
    emailData.html= template({user});
    await mg.messages.create(DOMAIN,emailData);
    console.log("Correo enviado con éxito");
    } catch (error) {
        console.log("Error al enviar mail")
        console.error(error)
    }
}














