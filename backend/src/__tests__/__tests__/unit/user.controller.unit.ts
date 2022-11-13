
// import {
//   JWTService,
//   MyUserService,
//   RefreshTokenService,
//   UserCredentialsRepository,
// } from '@loopback/authentication-jwt';
// import {securityId, UserProfile} from '@loopback/security';
// import {
//   createStubInstance,
//   expect,
//   sinon,
//   StubbedInstanceWithSinonAccessor,
//   stubExpressContext,
// } from '@loopback/testlab';
// import bcryptjs from 'bcryptjs';
// import FormData from 'form-data';
// import {randomPassword} from 'secure-random-password';
// import {UserController} from '../../../controllers';

// import {User, UserCredentials} from '../../../models';
// import {MovieRepository, UserRepository} from '../../../repositories';
// import { RefreshtokenService } from '../../../services';


// describe('UserController (unit)', () => {
//   let repo: StubbedInstanceWithSinonAccessor<UserRepository>;
//   let movieRepo: StubbedInstanceWithSinonAccessor<MovieRepository>;
//   let credsRepo: StubbedInstanceWithSinonAccessor<UserCredentialsRepository>;
//   let jwtService: StubbedInstanceWithSinonAccessor<JWTService>;
//   let userService: StubbedInstanceWithSinonAccessor<MyUserService>
//   let refreshService: StubbedInstanceWithSinonAccessor<RefreshtokenService>
//   let controller: UserController;

//   let adminUser: User;
//   let regularUser: User;
//   let credential: UserCredentials;
//   let regularProfile: UserProfile;

//   before(init);

//   describe('login', () => {
//     it('valid credentials', async () => {
//       const verifyCredentials = userService.stubs.verifyCredentials;
//       const convertToUserProfile = userService.stubs.convertToUserProfile;
//       const generateToken = jwtService.stubs.generateToken;

//       verifyCredentials.resolves(regularUser);
//       convertToUserProfile.resolves(regularProfile);
//       generateToken.resolves('token');

//       const credentials = {
//         email: adminUser.email,
//         password: credential.password,
//       };

//       const {data} = await controller.login(credentials);



//       expect(data).to.have.property('token');
//       expect(data).to.have.property('user');

//       sinon.assert.calledWith(verifyCredentials, credentials);
//       sinon.assert.calledWith(convertToUserProfile, regularUser);
//       sinon.assert.called(generateToken);
//     });

//     it('invalid credentials', async () => {
//       const verifyCredentials = userService.stubs.verifyCredentials;
//       verifyCredentials.rejects(new Error('Invalid email or password.'));

//       const credentials = {
//         email: 'random@email.com',
//         password: credential.password,
//       };

//       const {data} = await controller.login(credentials);


//       expect(data).to.be.null();

//       sinon.assert.calledWith(verifyCredentials, credentials);
//     });

//     it('user account with pending approval', async () => {
//       const verifyCredentials = userService.stubs.verifyCredentials;
//       verifyCredentials.rejects(new Error('User activation is still pending.'));

//       const credentials = {
//         email: 'random@email.com',
//         password: credential.password,
//       };

//       const {data} = await controller.login(credentials);


//       expect(data).to.be.null();

//       sinon.assert.calledWith(verifyCredentials, credentials);
//     });
//   });

//   describe('register', () => {
//     const sandbox = sinon.createSandbox();

//     it('registers a user', async () => {
//       const sandbox = sinon.createSandbox();

//       const genSaltSpy = sandbox.stub(bcryptjs, 'genSalt').resolves('salt');
//       const hashSpy = sandbox.stub(bcryptjs, 'hash').resolves('hash');
//       const data = new FormData();
//       repo.stubs.create.resolves(regularUser);
//       credsRepo.stubs.create.resolves(credential);

    
//       const jsonUser: {[key: string]: any} = regularUser.toJSON();
//       for (const key in jsonUser) {
//         if (key === 'id') continue;
//         data.append(key, jsonUser[key]);
//       }

//       const {request, response} = stubExpressContext({
//         url: '/users',
//         payload: data,
//         method: 'POST',
//       });

//       const result = await controller.create(request, response);

//       expect(result.data).to.containDeep(regularUser);

  
//       sinon.assert.called(hashSpy);
//       sinon.assert.called(genSaltSpy);
//     });

//   //   it('updates a user', async () => {
//   //     const sandbox = sinon.createSandbox();
//   //     const data = new FormData();
//   //     const genSaltSpy = sandbox.stub(bcryptjs, 'genSalt').resolves('salt');
//   //     const hashSpy = sandbox.stub(bcryptjs, 'hash').resolves('hash');
//   //     repo.stubs.create.resolves(regularUser);
//   //     credsRepo.stubs.create.resolves(credential);

   

//   //     const jsonUser: {[key: string]: any} = regularUser.toJSON();
//   //     for (const key in jsonUser) {
//   //       if (key === 'id') continue;
//   //       data.append(key, jsonUser[key]);
//   //     }

//   //     const {request, response} = stubExpressContext({
//   //       url: '/users',
//   //       payload: User,
//   //       method: 'PATCH',
//   //     });

//   //     const result = await controller.updateById('id', User);


//   //     expect(result).to.containDeep(regularUser);

//   //     sinon.assert.called(parseUploadBodyStub);
//   //     sinon.assert.called(hashSpy);
//   //     sinon.assert.called(genSaltSpy);
//   //   });
//   // });

//   function init() {
//     adminUser = new User({
//       id: '1',
//       fullName: 'Administrator',
//       email: 'admin@email.com',
//       permissions: 'ADMIN',
//       isActive: true,
//     });

//     regularUser = new User({
//       id: '1',
//       fullName: 'Regular User',
//       email: 'user@email.com',
//       permissions: 'USER',
//       isActive: true,
//     });

//     regularProfile = {
//       [securityId]: regularUser.id,
//       ...regularUser.toJSON(),
//     };

//     credential = new UserCredentials({
//       id: '1',
//       password: randomPassword(),
//       userId: '1',
//     });

//     repo = createStubInstance(UserRepository);
//     credsRepo = createStubInstance(UserCredentialsRepository);
//     movieRepo = createStubInstance(MovieRepository);
//     jwtService = createStubInstance(JWTService);
//     userService = createStubInstance(MyUserService);
//     refreshService=createStubInstance(refreshService);
//     controller = new UserController(

//       jwtService,
//       refreshService,
//       repo,
//       movieRepo,
//       credsRepo,
//     );
//   }
// });
