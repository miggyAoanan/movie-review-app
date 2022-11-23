import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  SchemaObject

} from '@loopback/rest';
import { User } from '../models';
import { UserRepository, ReviewRepository } from '../repositories';
import { HttpErrors } from '@loopback/rest';

import { Credentials } from '../services/user.service'

import { RefreshTokenService } from '../types'
import {
  authenticate,
  TokenService,
  UserService,
} from '@loopback/authentication';
import { inject } from '@loopback/core';
import { model, property } from '@loopback/repository';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { genSalt, hash } from 'bcryptjs';
import {
  RefreshTokenServiceBindings,
  TokenObject,
  TokenServiceBindings,
  UserServiceBindings,
} from '../index';

// Describes the type of grant object taken in by method "refresh"
type RefreshGrant = {
  refreshToken: string;
};

// Describes the schema of grant object
const RefreshGrantSchema: SchemaObject = {
  type: 'object',
  required: ['refreshToken'],
  properties: {
    refreshToken: {
      type: 'string',
    },
  },
};

// Describes the request body of grant object
const RefreshGrantRequestBody = {
  description: 'Reissuing Acess Token',
  required: true,
  content: {
    'application/json': { schema: RefreshGrantSchema },
  },
};

// Describe the schema of user credentials
const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': { schema: CredentialsSchema },
  },
};



export class UserController {
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
    @repository(ReviewRepository)
    public reviewsRepository: ReviewRepository,


  ) { }


  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: { 'application/json': { schema: getModelSchemaRef(User) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewUser',
            exclude: ['id', 'verificationToken', 'isActive', 'permissions', 'reviewId', 'dateCreated'],
          }),
        },
      },
    })
    newUserRequest: NewUserRequest,
  ): Promise<User | string> {
    const userAlreadyExistsError = 'User already exists.';
    const dbCheckCount = await this.userRepository.count()
    const foundUser = await this.userRepository.findOne({
      where: { email: newUserRequest.email },
    });


    if (dbCheckCount.count === 0 && !foundUser) {
      const password = await hash(newUserRequest.password, await genSalt());
      newUserRequest.isActive = true
      newUserRequest.permissions = 'admin'
      delete (newUserRequest as Partial<NewUserRequest>).password;
      const savedUser = await this.userRepository.create(newUserRequest);
      await this.userRepository.userCredentials(savedUser.id).create({ password });
      return savedUser;
    }

    else if (dbCheckCount.count > 0 && !foundUser) {

      const password = await hash(newUserRequest.password, await genSalt());
      newUserRequest.isActive = false
      newUserRequest.permissions = 'user'
      delete (newUserRequest as Partial<NewUserRequest>).password;
      const savedUser = await this.userRepository.create(newUserRequest);
      await this.userRepository.userCredentials(savedUser.id).create({ password });
      return savedUser;
    }
    else {
      throw new HttpErrors.Unauthorized(userAlreadyExistsError);
    }

  }


  /**
   * A login function that returns an access token. After login, include the token
   * in the next requests to verify your identity.
   * @param credentials User email and password
   */
  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{ data: Object }> {
    const foundUser = await this.userRepository.findOne({
      where: { email: credentials.email },
    });
    const isActive = foundUser?.isActive
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile = this.userService.convertToUserProfile(user);
    const token = await this.jwtService.generateToken(userProfile);
    if (isActive === false) {
      throw new HttpErrors.Unauthorized("Please wait for the activation");
    }
    let data = { ...user, token }
    return { data };
  }


  // @authenticate('jwt')
  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find({
      order: ['dateCreated ASC'],
    });

  }


  @authenticate('jwt')
  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, { exclude: 'where' }) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }
  // @authenticate('jwt')
  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, { partial: true }),
        },
      },
    })
    user: User,
  ): Promise<string> {

    const emailDuplicateError = "Email is already taken"
    const updateSuccess = "User update is successfull"
    const errorMessage = "You cannot update the root admin";

    const foundUser = await this.userRepository.findOne({
      where: { email: user.email }
    });
    const rootAdmin = await this.userRepository.find({
      order: ['dateCreated ASC'],
      limit: 1,
    });
    if (rootAdmin[0].id === id) {
      return errorMessage
    }

    else if (foundUser && foundUser.id !== id) {
      return emailDuplicateError
    }
    else{
      await this.userRepository.updateById(id, user);
      return updateSuccess
    }


   
  }
  @authenticate('jwt')
  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<string> {
   
    const errorMessage = "You cannot delete the root admin";
    const successMessage = "Successfully deleted";

    const rootAdmin = await this.userRepository.find({
      order: ['dateCreated ASC'],
      limit: 1,
    });

    if (rootAdmin[0].id === id) {
      return errorMessage
    }
    await this.userRepository.deleteById(id);
    await this.userRepository.userCredentials(id).delete();
    await this.reviewsRepository.deleteAll({ userId: id });
    return successMessage
  }


}

