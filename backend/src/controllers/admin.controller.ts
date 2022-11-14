import {
  model,
  property
} from '@loopback/repository';
import {
  post,
  getModelSchemaRef,
  requestBody,
  response,
  HttpErrors

} from '@loopback/rest';
import { User } from '../models';
import { UserRepository } from '../repositories';

import { Credentials } from '../services/user.service'
import {validateCredentials} from '../services';
import _ from 'lodash';
import { RefreshTokenService } from '../types'
import {

  TokenService,
  UserService,
} from '@loopback/authentication';
import { inject } from '@loopback/core';

import { SecurityBindings, UserProfile } from '@loopback/security';
import { genSalt, hash } from 'bcryptjs';
import {
  RefreshTokenServiceBindings,
  TokenServiceBindings,
  UserServiceBindings,
} from '../index';



@model()
export class NewAdminUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}




export class AdminController {
  constructor(
    // @repository(UserRepository)
    // public userRepository: UserRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
    @inject(SecurityBindings.USER, { optional: true })
    private user: UserProfile,
    @inject(UserServiceBindings.USER_REPOSITORY)
    public userRepository: UserRepository,
    @inject(RefreshTokenServiceBindings.REFRESH_TOKEN_SERVICE)
    public refreshService: RefreshTokenService,


  ) { }


  @post('/admin')
  @response(200, {
    description: 'User model instance',
    content: { 'application/json': { schema: getModelSchemaRef(User) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewAdminUserRequest, {
            title: 'NewUser',
            exclude: ['id', 'verificationToken', 'isActive', 'permissions', 'reviewId', 'dateCreated'],
          }),
        },
      },
    })
    NewAdminUserRequest: NewAdminUserRequest,
  ): Promise<User> {
    validateCredentials(_.pick(NewAdminUserRequest, ['email', 'password']));
    const userAlreadyExistsError = 'User already exists.';
    //check if the email exist --> to avoid duplicates

    const foundUser = await this.userRepository.findOne({
      where: { email: NewAdminUserRequest.email },
    });

    if (!foundUser) {
      const password = await hash(NewAdminUserRequest.password, await genSalt());
      NewAdminUserRequest.isActive = true
      NewAdminUserRequest.permissions = 'admin'
      delete (NewAdminUserRequest as Partial<NewAdminUserRequest>).password;
      const savedUser = await this.userRepository.create(NewAdminUserRequest);
      await this.userRepository.userCredentials(savedUser.id).create({ password });
    
      return savedUser;
    }
    else {
      throw new HttpErrors.Unauthorized(userAlreadyExistsError);
    }


  }


}

