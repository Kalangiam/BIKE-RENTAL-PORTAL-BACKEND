import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()


const ResetPassword = async ({ email, resetToken }) => {
    const html = `<h5> Dear ${email}</h5>
                    <p>your code to reset password for Bike Rental Portal is <mark>${resetToken}<mark>. </p>
                    <p>Copy the code and paste it in Captcha</p>
                    <div>Thanks,
                    <br>
                    Bike Rental Team
                    </div>`;
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gladsonkalangiam@gmail.com',
                pass: 'ofnravoryoxqacjr'
            }
        });

        const info = await transporter.sendMail({
            from: 'gladsonkalangiam@gmail.com',
            to: 'kalanjiamr779@gmail.com',
            subject: 'Code for password reset',
            html: html

        })
        console.log("Message sent: " + info.messageId);
    }
    catch (error) {
        console.log(error)
    }
}

export default ResetPassword