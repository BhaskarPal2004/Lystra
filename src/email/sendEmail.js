import nodemailer from 'nodemailer'
import hbs from "nodemailer-express-handlebars";
import 'dotenv/config'

const sendEmail = async (emailID, templateName, contextData, subject) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_MAIL,
            pass: process.env.MY_MAIL_PASSWORD
        }
    });
    transporter.use('compile', hbs({
        viewEngine: {
            extname: '.hbs',
            layoutsDir: './src/views',
            defaultLayout: false,
            partialsDir: './src/views',
        },
        viewPath: './src/email',
        extName: '.hbs'
    }));

    const mailConfigurations = {
        from: process.env.MY_MAIL,
        to: `${emailID}`,
        subject: subject,
        template: templateName,
        context: contextData
    };

    transporter.sendMail(mailConfigurations, function (error) {
        if (error) {
            console.log("error: ",error.message)
        }
        else{
        console.log('Email Sent Successfully');
        }
    });
}
export default sendEmail;