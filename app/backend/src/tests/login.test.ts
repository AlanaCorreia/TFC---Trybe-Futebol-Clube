import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

describe('Object User', () => {
  const mockUser = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  }

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(mockUser as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('O método post /login retorna o status 200 e um token caso contenha os dados corretos', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(chaiHttpResponse).to.have.status(StatusCodes.OK);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('O método post /login retorna o status 400 e a mensagem "All fields must be filled", caso tente fazer o login sem email', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: 'secret_admin' });

    expect(chaiHttpResponse).to.have.status(StatusCodes.BAD_REQUEST);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.have.equal('All fields must be filled');
  });
  
  it('O método post /login retorna o status 400 e a mensagem "All fields must be filled", caso tente fazer o login sem informar uma senha', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admim.com' });

    expect(chaiHttpResponse).to.have.status(StatusCodes.BAD_REQUEST);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.have.equal('All fields must be filled');
  });
  
  it('O método post /login retorna o status 401 e a mensagem "Incorrect email or password", caso tente fazer o login com senha inválida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admim.com', password: 'secret_123' });

    expect(chaiHttpResponse).to.have.status(StatusCodes.UNAUTHORIZED);
    expect(chaiHttpResponse.body.message).to.have.equal('Incorrect email or password');
  });
  
  it('O método post /login retorna o status 401 e a mensagem "Incorrect email or password", caso tente fazer o login com email inválido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@user.com', password: 'secret_123' });

    expect(chaiHttpResponse).to.have.status(StatusCodes.UNAUTHORIZED);
    expect(chaiHttpResponse.body.message).to.have.equal('Incorrect email or password');
  });
});
