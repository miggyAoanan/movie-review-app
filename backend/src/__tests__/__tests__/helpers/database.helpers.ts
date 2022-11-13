import { Getter } from '@loopback/core';
import { genSalt, hash } from 'bcryptjs';
import _ from 'lodash';
import { User, UserCredentials } from '../../../models';
import {
  ActorRepository,
  MovieRepository,
  ReviewRepository,
  UserCredentialsRepository,
  UserRepository
} from '../../../repositories';
import { mongodb } from '../fixtures/datasources/mongodb.datasource';

const userCredsRepo = new UserCredentialsRepository(mongodb);
const reviewRepo = new ReviewRepository(mongodb);
const userRepo = new UserRepository(mongodb, Getter.fromValue(userCredsRepo), Getter.fromValue(reviewRepo));
const actorRepo = new ActorRepository(mongodb);
const movieRepo = new MovieRepository(mongodb, Getter.fromValue(actorRepo),  Getter.fromValue(reviewRepo));

export async function givenEmptyDatabase() {
  await Promise.all([
    userRepo.deleteAll(),
    userCredsRepo.deleteAll(),
    actorRepo.deleteAll(),
    movieRepo.deleteAll(),
    reviewRepo.deleteAll(),
  ]);
}

export async function givenUserCredentialData(data: Partial<UserCredentials>) {
  return userCredsRepo.create(data);
}

export async function givenUserData(data: Partial<User & { password: string }>) {
  const user = await userRepo.create(_.omit(data, 'password'));

  const password = await hash(data.password!, await genSalt());
  await userRepo.userCredentials(user.id).create({password});

  return user;
}