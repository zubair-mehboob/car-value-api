import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    //await app.close();
  });

  it('signup user', async () => {
    const email = 'e309e@yopmail.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'password' })
      .expect(201);
    const { id, email: returnedEmail } = res.body;
    expect(id).toBeDefined();
    expect(returnedEmail).toEqual(email);
  });
});
