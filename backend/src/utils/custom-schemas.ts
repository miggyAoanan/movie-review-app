import {SchemaObject} from '@loopback/openapi-v3';

// API Response Schema
export const CustomResponseSchema: SchemaObject = {
  type: 'object',
  'x-ts-type': 'Response',
  title: 'Response',
    data: {
      type: 'object',
    },
};

// User Controller Custom Schemas
export const UserLoginSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  title: 'Login user',
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
};

// Movies Controller Custom Schemas
export const PostMovieSchema: SchemaObject = {
  type: 'object',
  required: ['title', 'cost', 'year'],
  title: 'Create new Movie',
  properties: {
    title: {
      type: 'string',
    },
    overview: {
      type: 'string',
    },
    cost: {
      type: 'number',
    },
    year: {
      type: 'string',
    },
    image: {
      type: 'string',
    },
    actors: {
      type: 'array',
      default: [],
    },
  },
};