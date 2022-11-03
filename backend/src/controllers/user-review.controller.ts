import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  Review,
} from '../models';
import {UserRepository} from '../repositories';

export class UserReviewController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/review', {
    responses: {
      '200': {
        description: 'Review belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Review)},
          },
        },
      },
    },
  })
  async getReview(
    @param.path.string('id') id: typeof User.prototype.id,
  ): Promise<Review> {
    return this.userRepository.review(id);
  }
}
