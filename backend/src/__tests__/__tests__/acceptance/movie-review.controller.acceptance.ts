import { Client, expect } from '@loopback/testlab';
import _ from 'lodash';

import { BackendApplication } from '../../../application'
import { Movie } from '../../../models';

import { givenEmptyDatabase } from '../helpers/database.helpers';
import { setupApplication } from './test-helper';

describe('Movie Routes', () => {
  let app: BackendApplication;
  let client: Client;
  let movies: { [key: string]: Partial<Movie> };

  before(givenEmptyDatabase);

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());


    movies =  {
       movie1:{
        title: "test title for unit test",
        overview: "This is test for overview",
        yearReleased: 2022,
        cost: 980000,
        imageURL: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/AeyiuQUUs78bPkz18FY3AzNFF8b.jpg",
        actorIds: [
          "636fa042cbde64e928721fc0",
          "636fa086cbde64e928721fc1"
        ],
       }
        
    } ;  

    for (const movie of Object.values(movies)) {
      await givenEmptyDatabase();
    }
  });

  after(async () => {
    await app.stop();
  });

  it('will successfully create an instance of a movie', async () => { //tested
    const response = await client
      .post('/movies')
      .send(movies.movie1);
      const data  = response.body
      expect(data).to.hasOwnProperty('title');
      expect(data).to.hasOwnProperty('overview');
      expect(data).to.hasOwnProperty('yearReleased');
      expect(data).to.hasOwnProperty('cost'); 
      expect(data).to.hasOwnProperty('imageURL'); 
      expect(data).to.hasOwnProperty('actorIds');
   
  });

  
  

})
