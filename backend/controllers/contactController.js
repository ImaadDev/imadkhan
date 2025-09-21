import nodemailer from 'nodemailer';

export const sendMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate input
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password if using Gmail 2FA
      },
    });

    // Create a more professional HTML body
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
        <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <h2 style="color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 10px;">New Message from Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #0056b3; text-decoration: none;">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 20px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 30px; font-size: 14px; color: #777;">This message was sent from your portfolio website's contact form.</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: `Portfolio Contact: ${subject}`, // More descriptive subject line
      html: htmlBody,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong while sending email.' });
  }
};