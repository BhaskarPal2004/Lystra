import nodemailer from 'nodemailer'
import hbs from "nodemailer-express-handlebars";
import 'dotenv/config'

const sendEmail = (emailID, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "hadi@itobuz.com",
            pass: process.env.EMAIL_PASSWORD
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
            baseUrl: process.env.FRONT_END_URL,
            registerToken: `${token}`
        }
    };

    transporter.sendMail(mailConfigurations, function (error) {
        if (error) throw Error(error);
        console.log('Email Sent Successfully');
    });
}
export default sendEmail;