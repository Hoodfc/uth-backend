import * as nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export default async (email: string, url: string): Promise<void> => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: email,
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: `<a href='${url}'>${url}</a>`,
  });

  console.log('Message sent: %s', info.messageId);

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
