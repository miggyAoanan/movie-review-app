import {Entity, model, property, referencesMany, hasMany} from '@loopback/repository';
import {Actor} from './actor.model';
import {Review} from './review.model';

@model()
export class Movie extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',

  })
  overview: string;


  @property({
    type: 'number',
    required: true,
  })
  yearReleased: number;

  @property({
    type: 'number',
    required: true,
  })
  cost: number;

  @property({
    type: 'string',
    required: true,
  })
  imageURL: string;

  @referencesMany(() => Actor)
  actorIds: string[];

  @hasMany(() => Review)
  reviews: Review[];

  constructor(data?: Partial<Movie>) {
    super(data);
  }
}

export interface MovieRelations {
  // describe navigational properties here
}

export type MovieWithRelations = Movie & MovieRelations;
