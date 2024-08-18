import request from 'supertest';
import app from '../index';

describe('Statistics', () => {
  let adminToken: string;
  let userToken: string;
  const testuser = `testuser_${Date.now()}`;
  const testuser2 = `testuser_${Date.now() + 1}`;

  beforeAll(async () => {
    const adminResponse = await request(app).post('/register').send({
      username: testuser,
      password: 'adminpassword',
      role: 'ADMIN',
    });
    adminToken = adminResponse.body.token;

    const userResponse = await request(app).post('/register').send({
      username: testuser2,
      password: 'userpassword',
      role: 'USER',
    });
    userToken = userResponse.body.token;
  });

  it('should return statistics for admin users', async () => {

    const response = await request(app)
      .get('/stats')
      .set('Authorization', `Bearer ${adminToken}`);
    console.log('HOLAASDASDDSAS');
    console.log('Response body:', response.body);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((user: any) => {
      expect(user).toHaveProperty('username');
    });
  });

  it('should return 403 for non-admin users requesting stats', async () => {
    const response = await request(app)
      .get('/stats')  
      .set('Authorization', `Bearer ${userToken}`);
    console.log('CHAUAUACHHA');
    console.log('Response body:', response.body);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', 'Forbidden');
  });
});
