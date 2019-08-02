const request = require('supertest');
require('dotenv').config();
const server = require('../server');
const db = require('../utilities/sequelize');

let token = null;

beforeAll(async () => {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 3000);
  })
  await db.authentications.destroy({ truncate: true });
});

afterAll(async () => {
  await db.sequelize.close();
});

describe('test authentication', () => {
  test('Vào trang authentication lỗi vì chưa có token', async () => {
    const response = await request(server).get('/api/v1');
    expect(response.status).toBe(401);
  });

  test('đăng ký một tài khoản thành công', async () => {
    const response = await request(server).post('/api/v1/register')
      .send({
        username: 'hoaitx',
        password: 'hoaitx',
      });
    expect(response.status).toBe(200);
  });

  test('đăng nhập thành công thành công', async () => {
    const response = await request(server).post('/api/v1/login')
      .send({
        username: 'hoaitx',
        password: 'hoaitx',
      });
    token = response.body.data.token;
    expect(response.status).toBe(200);
  });

  test('Vào trang authentication thành công khi đã có token', async () => {
    const response = await request(server)
      .get('/api/v1')
      .set('Authorization', token);
    expect(response.status).toBe(200);
  });
});