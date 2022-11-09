import {SchemaObject} from '@loopback/openapi-v3';

// API Response Schema
export const CustomResponseSchema: SchemaObject = {
  type: 'object',
  'x-ts-type': 'Response',
  title: 'Response',
  properties: {
    status: {
      type: 'string',
      enum: ['success', 'fail'],
    },
    data: {
      type: 'object',
    },
    message: {
      type: 'string',
    },
  },
};



export type CustomResponse<T> = {
    status: 'success' | 'fail';
    data?: T | T[] | null;
    message?: string;
  };
  