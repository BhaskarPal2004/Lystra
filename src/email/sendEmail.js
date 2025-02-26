import nodemailer from 'nodemailer'
import hbs from "nodemailer-express-handlebars";
import 'dotenv/config'

const sendEmail = async (emailID, token) => {
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
        from: 'hadi@itobuz.com',
        to: `${emailID}`,
        subject: `Email Verification: ${emailID}`,
        template: 'emailTemplate',
        context: {
            port: process.env.PORT,
            token: `${token}`
        }
    };

    transporter.sendMail(mailConfigurations, function (error) {
        if (error) throw Error(error.message);
        console.log('Email Sent Successfully');
    });
}
export default sendEmail;