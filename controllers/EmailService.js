import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()


const EmailService = async ({ no, name }) => {
    const html = `<p> Dear ${name}</p>
                    <p>your BookingID for Bike Rental Portal is ${no}. </p>
                    <p>Initially your Booking status will be not Booked, After admin verification, you status will be updated to Waiting and Finally booked</p>
                    <p>you can see status at http://localhost:5173/users/login </p>
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
            subject: 'BookingID for Bike Rental Portal',
            html: html

        })
        console.log("Message sent: " + info.messageId);
    }
    catch (error) {
        console.log(error)
    }
}



export default EmailService




