import { Client, expect } from '@loopback/testlab';
import _ from 'lodash';

import { BackendApplication } from '../../../application'
import { Review } from '../../../models';
import { givenEmptyDatabase } from '../helpers/database.helpers';
import { setupApplication } from './test-helper';

describe('Review Routes', () => {
  let app: BackendApplication;
  let client: Client;
  let reviews: { [key: string]: Partial<Review> };

  before(givenEmptyDatabase);

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());


    reviews =  {
       review1:{
        description: "This is unit test for review",
        rating: 5,
        userId: "user123456789",
        userName: "John",
        movieName : "Avengers: Infinity War (2018)",
        movieId: "636fa26fcbde64e928721fc9",
        isActive: false
  
       }
        
    } ;  

    for (const review of Object.values(reviews)) {
      await givenEmptyDatabase();
    }
  });

  after(async () => {
    await app.stop();
  });



  it('will reject the review as the user already have an existing review', async () => { //tested
    const response = await client
      .post('/movies/636fa26fcbde64e928721fc9/reviews')
      .send(reviews.review1);
      const message = response.body.error.message
    expect(message).to.be.equal('You have already reviewed this movie');
   
  });

  
  

})
