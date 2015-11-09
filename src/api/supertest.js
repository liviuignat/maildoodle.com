import supertest from 'supertest';
import app from './../universal/expressApp';

export const request = supertest(app);