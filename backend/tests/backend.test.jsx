const request = require('supertest');
const app = require('../index');

describe('Backend API Tests', () => {
  it('should return 400 if fileName is not provided', async () => {
    const res = await request(app).post('/read-csv').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'fileName is required');
  });

  it('should return 404 if file is not found', async () => {
    const res = await request(app).post('/read-csv').send({ fileName: 'nonexistent.csv' });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should execute Python script and return valid JSON', async () => {
    const res = await request(app).post('/sample');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
