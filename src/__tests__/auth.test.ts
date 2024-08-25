import request from 'supertest';
import app from '../index';
import prisma from '../prismaClient';
import jwt from 'jsonwebtoken';

describe('Authentication', () => {
  let token: string;
  const testuser = `testuser_${Date.now()}`;
  let userId: number;

  it('should register a new user', async () => {
    const response = await request(app).post('/register').send({
      username: testuser,
      password: 'testpassword',
      role: 'USER',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    userId = (decodedToken as any).id;
  });

  it('should send an email and save it in the database', async () => {
    const response = await request(app)
      .post('/email')
      .set('Authorization', `Bearer ${token}`)
      .send({
        to: 'pagliariccipablo5@gmail.com',
        subject: 'Hola',
        text: 'Pablito',
      });

    if (response.status !== 200) {
      console.error('Error response:', response.body);
    }

    expect(response.status).toBe(200);

    const email = await prisma.email.findFirst({
      where: {
        userId,
        recipient: 'pagliariccipablo5@gmail.com',
        subject: 'Hola',
        body: 'Pablito',
      },
    });
    expect(email).not.toBeNull();
  });

  it('should login a user and return a token', async () => {
    const response = await request(app).post('/login').send({
      username: testuser,
      password: 'testpassword',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
