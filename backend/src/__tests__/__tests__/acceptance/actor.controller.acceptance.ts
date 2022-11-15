import { Client, expect } from '@loopback/testlab';
import _ from 'lodash';

import { BackendApplication } from '../../../application'
import { Actor, Movie } from '../../../models';

import { givenEmptyDatabase } from '../helpers/database.helpers';
import { setupApplication } from './test-helper';

describe('Actor Routes', () => {
  let app: BackendApplication;
  let client: Client;
  let actors: { [key: string]: Partial<Actor> };

  before(givenEmptyDatabase);

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());


    actors =  {
       actor1:{ 
        firstName: "Chris ",
        lastName: "Hemsworth",
        gender: "male",
        age: 39,
        imageURL: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/jpurJ9jAcLCYjgHHfYF32m3zJYm.jpg"
       }
        
    } ;  

    for (const actor of Object.values(actors)) {
      await givenEmptyDatabase();
    }
  });

  after(async () => {
    await app.stop();
  });

  it('will successfully create an instance of an actor', async () => { //tested
    const response = await client
      .post('/actors')
      .send(actors.actor1);
      // const {message, data, success} = response.body;
      const data  = response.body
      expect(data).to.hasOwnProperty('firstName');
      expect(data).to.hasOwnProperty('lastName');
      expect(data).to.hasOwnProperty('gender'); 
      expect(data).to.hasOwnProperty('imageURL'); 
     
  });

  
  

})
