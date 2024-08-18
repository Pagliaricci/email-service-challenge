import request from 'supertest';
import app from '../index';

describe('Authentication', () => {
  let token: string;
  const testuser = `testuser_${Date.now()}`;
  it('should register a new user', async () => {
    const response = await request(app).post('/register').send({
      username: testuser,
      password: 'testpassword',
      role: 'USER',
    });    

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
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
