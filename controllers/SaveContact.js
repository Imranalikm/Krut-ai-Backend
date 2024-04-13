import nodemailer from 'nodemailer';
import ContactFormModel from '../models/ContactFormModel.js';

export default async function SaveContact(req, res) {
  const { name, email, phoneNumber, profession, linkedInProfile, howHeard } = req.body;

  try {
    const newContact = new ContactFormModel({
      name,
      email,
      phoneNumber,
      profession,
      linkedInProfile,
      howHeard
    });

    const savedContact = await newContact.save();

    // Send email
    await sentMail('imranalikm@gmail.com', name,email, phoneNumber, profession, linkedInProfile, howHeard);

    res.status(200).send('Contact data saved and email sent successfully');
  } catch (error) {
    console.error('Error saving contact data:', error);
    res.status(500).send('Error saving contact data');
  }
}

async function sentMail(recipientEmail, name,email, phoneNumber, profession, linkedInProfile, howHeard) {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: 'New Form Submitted',
      html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone Number: ${phoneNumber}</p>
        <p>Profession: ${profession}</p>
        <p>LinkedIn Profile: ${linkedInProfile}</p>
        <p>How Heard: ${howHeard}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
}
