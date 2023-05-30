import app from '../index';
import request from 'supertest';


describe('Index Route', () => {
  it('should return "Hello, world!" on GET request to "/"', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Localify - API Server');
  });
});
