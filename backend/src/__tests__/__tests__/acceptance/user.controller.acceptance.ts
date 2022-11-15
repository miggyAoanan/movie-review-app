import { Client, expect } from '@loopback/testlab';
import _ from 'lodash';
import { randomPassword } from 'secure-random-password';
import { BackendApplication } from '../../../application'
import { User } from '../../../models';
// import {TResponse} from '../../utils';
import { givenEmptyDatabase, givenUserData } from '../helpers/database.helpers';
import { setupApplication } from './test-helper';

describe('User Routes', () => {
  let app: BackendApplication;
  let client: Client;
  let password: string;
  let users: { [key: string]: Partial<User & { password: string }> };

  before(givenEmptyDatabase);

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());

    password = randomPassword();

    users = {
      adminUser: {
        id: '1',
        fullName: 'admin',
        email: 'admin@mail.com',
        permissions: 'admin',
        isActive: true,
        password,
      },
      normalActiveUser: {
        id: '2',
        fullName: 'John Doe',
        email: 'johndoe@gmail.com',
        permissions: 'user',
        isActive: true,
        password,
      },
      normalInactiveUser: {
        id: '3',
        fullName: 'Tim Hortons',
        email: 'tim@gmail.com',
        permissions: 'user',
        isActive: false,
        password,
      },
    };

    for (const user of Object.values(users)) {
      await givenUserData(user);
    }
  });

  after(async () => {
    await app.stop();
  });

  it('validates user credentials', async () => { //tested
    const response = await client
      .post('/users/login')
      .send({ email: 'mighty@email.com', password });
      // const {message, data, success} = response.body;

      const message = response.body.error.message
   
    expect(message).to.be.equal('Invalid email or password.');
  });

  it('rejects an inactive user', async () => { //tested
    let pass1 = "123456789"
    const response = await client
      .post('/users/login')
      .send({ email: 'tim@gmail.com', password: pass1 });

      const message = response.body.error.message
  
    expect(message).to.be.equal('Please wait for the activation');
  });

  it('returns the token and user profile on upon successful validation', async () => {
    let pass="admin1234"
    const response = await client.post('/users/login').send({
      email: "admin@mail.com",
      password: pass,
    });

    const data  = response.body.data
    expect(data).to.hasOwnProperty('fullName');
    expect(data).to.hasOwnProperty('email');
    expect(data).to.hasOwnProperty('isActive');
    expect(data).to.hasOwnProperty('permissions'); 
    expect(data).to.hasOwnProperty('dateCreated'); 
    expect(data).to.hasOwnProperty('token');

    
  });

  it('checks existing email for sign up/register', async () => {
    let password = "123456789"
    const response = await client
      .post('/users')
      .send({fullName: 'Tim Hortons', email: 'tim@gmail.com', password });

      const message = response.body.error.message
   
    expect(message).to.be.equal('User already exists.');
    
  });



  it('rejects not existing email', async () => { //tested
    let pass1 = "123456789"
    const response = await client
      .post('/users/login')
      .send({ email: 'user@gmail.com', password: pass1 });

      const message = response.body.error.message
      console.log(message)
  
    expect(message).to.be.equal('Invalid email or password.');
  });

});
