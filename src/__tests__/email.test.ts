import sendEmail from '../services/emailService';
import sgMail from '@sendgrid/mail';

describe('Email Service', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test';
    process.env.SENDGRID_API_KEY = 'your-new-api-key'; //tenia problemas para traerme la clave desde el archivo .env asique la puse aca
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  });

  it('should send email successfully', async () => {
    try {
      await sendEmail('pagliariccipablo5@gmail.com', 'Hola', 'Pablo');
    } catch (error) {
      throw new Error('Email sending failed');
    }
  });
});
