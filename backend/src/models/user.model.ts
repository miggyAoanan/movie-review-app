import { Entity, hasOne, model, property, belongsTo} from '@loopback/repository';
import { UserCredentials } from './user-credentials.model';
import {Review} from './review.model';

@model({
  settings: {
    strict: true,
  },
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  fullName: string;

  // must keep it
  // feat email unique
  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  email: string;

  @property({
    type: 'boolean',
  })
  isActive?: boolean;


  @property({
    type: 'string',
  })
  permissions?: string;

  @belongsTo(() => Review)
  reviewId: string;
  
  @property({
    type: 'string',
  })
  verificationToken?: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  dateCreated: string;


  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
