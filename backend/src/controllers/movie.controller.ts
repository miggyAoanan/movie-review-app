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
} from '@loopback/rest';
import {Movie} from '../models';
import {CustomResponse, CustomResponseSchema} from '../models'
import {MovieRepository} from '../repositories';

export class MovieController {
  constructor(
    @repository(MovieRepository)
    public movieRepository : MovieRepository,
  ) {}

  @post('/movies')
  @response(200, {
    description: 'Movie model instance',
    content: {'application/json': {schema: getModelSchemaRef(Movie)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movie, {
            title: 'NewMovie',
            exclude: ['id'],
          }),
        },
      },
    })
    movie: Omit<Movie, 'id'>,
  ): Promise<Movie> {
    return this.movieRepository.create(movie);
  }

  @get('/movies/count')
  @response(200, {
    description: 'Movie model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Movie) where?: Where<Movie>,
  ): Promise<Count> {
    return this.movieRepository.count(where);
  }

  @get('/movies')
  @response(200, {
    description: 'Array of Movie model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Movie, {includeRelations: true}),
        },
      },
    },
  })
  async searchByname(
    @param.filter(Movie) filter?: Filter<Movie>,
  ): Promise<Movie[]> {
    return this.movieRepository.find({include :['actors', 'reviews']});

  }

  @get('search/movies/{term}')
  @response(200, {
    description:
      'Returns an array of all movies based on the find filter (provide movie title as the search key).',
      content: {'application/json': {schema: CustomResponseSchema}},
  })
  async searchByName(
    @param.path.string('term') term: string,
  ): Promise<CustomResponse<{}>> {

      try {

        const searchParam = term || '';
        const searchParams = [{title: {like: term, options: 'i'}}];
        const filterObject = {
          where: {or: searchParams},
          order: ['title ASC'],
          include :['actors', 'reviews']
          
        };
        const moviesList = await this.movieRepository.find(filterObject);

        return {
          status: 'success',
          data: moviesList,
          message: 'Successfully fetched movies.',
        };
        
      } catch (error:any) {
        return {
          status: 'fail',
          data: null,
          message: 'Fetching movie data failed.',
        };
      }

    // return this.movieRepository.find({include :['actors', 'reviews']});

  }

  @patch('/movies')
  @response(200, {
    description: 'Movie PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movie, {partial: true}),
        },
      },
    })
    movie: Movie,
    @param.where(Movie) where?: Where<Movie>,
  ): Promise<Count> {
    return this.movieRepository.updateAll(movie, where);
  }

  @get('/movies/{id}') // get reviews and actors
  @response(200, {
    description: 'Movie model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Movie, {includeRelations: true}),
        items: getModelSchemaRef(Movie, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
   
    @param.filter(Movie) filter?: Filter<Movie>,
  ): Promise<Movie> {
    return this.movieRepository.findById(id, {include :['reviews', 'actors']});
    
  }


  @get('/movies-actors/{id}')
  @response(200, {
    description: 'Movie model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Movie, {includeRelations: true}),
        items: getModelSchemaRef(Movie, {includeRelations: true}),
      },
    },
  })
  async findActorById(
    @param.path.string('id') id: string,
   
    @param.filter(Movie) filter?: Filter<Movie>,
  ): Promise<Movie> {
    return this.movieRepository.findById(id, {include :['actors']});
    
  }

  @get('/actor-movies/{id}')
  @response(200, {
    description: 'Movie model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Movie, {includeRelations: true}),
        items: getModelSchemaRef(Movie, {includeRelations: true}),
      },
    },
  })
  async findMovieByActorId(
    @param.path.string('id') id: string,
   
    @param.filter(Movie) filter?: Filter<Movie>,
  ): Promise<Movie> {

    return this.movieRepository.findById(id, {include :['actors']});
    
  }



  @patch('/movies/{id}')
  @response(204, {
    description: 'Movie PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movie, {partial: true}),
        },
      },
    })
    movie: Movie,
  ): Promise<void> {
    await this.movieRepository.updateById(id, movie);
  }

  @put('/movies/{id}')
  @response(204, {
    description: 'Movie PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() movie: Movie,
  ): Promise<void> {
    await this.movieRepository.replaceById(id, movie);
  }

  @del('/movies/{id}')
  @response(204, {
    description: 'Movie DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.movieRepository.deleteById(id);
  }
}
