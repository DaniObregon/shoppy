const request = require('supertest');
const { sequelize, Product  } = require('../../server/models');
const app = require('../../server/server');

describe('Integration Test - GET /api/products', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should fetch all products from the database', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return 500 if there is a database error', async () => {
    jest.spyOn(Product, 'findAll').mockRejectedValue(new Error('DB error'));
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(500);
  });
});
