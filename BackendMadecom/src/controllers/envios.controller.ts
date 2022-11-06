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
import {Envios} from '../models';
import {EnviosRepository} from '../repositories';

export class EnviosController {
  constructor(
    @repository(EnviosRepository)
    public enviosRepository : EnviosRepository,
  ) {}

  @post('/envios')
  @response(200, {
    description: 'Envios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Envios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Envios, {
            title: 'NewEnvios',
            exclude: ['id'],
          }),
        },
      },
    })
    envios: Omit<Envios, 'id'>,
  ): Promise<Envios> {
    return this.enviosRepository.create(envios);
  }

  @get('/envios/count')
  @response(200, {
    description: 'Envios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Envios) where?: Where<Envios>,
  ): Promise<Count> {
    return this.enviosRepository.count(where);
  }

  @get('/envios')
  @response(200, {
    description: 'Array of Envios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Envios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Envios) filter?: Filter<Envios>,
  ): Promise<Envios[]> {
    return this.enviosRepository.find(filter);
  }

  @patch('/envios')
  @response(200, {
    description: 'Envios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Envios, {partial: true}),
        },
      },
    })
    envios: Envios,
    @param.where(Envios) where?: Where<Envios>,
  ): Promise<Count> {
    return this.enviosRepository.updateAll(envios, where);
  }

  @get('/envios/{id}')
  @response(200, {
    description: 'Envios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Envios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Envios, {exclude: 'where'}) filter?: FilterExcludingWhere<Envios>
  ): Promise<Envios> {
    return this.enviosRepository.findById(id, filter);
  }

  @patch('/envios/{id}')
  @response(204, {
    description: 'Envios PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Envios, {partial: true}),
        },
      },
    })
    envios: Envios,
  ): Promise<void> {
    await this.enviosRepository.updateById(id, envios);
  }

  @put('/envios/{id}')
  @response(204, {
    description: 'Envios PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() envios: Envios,
  ): Promise<void> {
    await this.enviosRepository.replaceById(id, envios);
  }

  @del('/envios/{id}')
  @response(204, {
    description: 'Envios DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.enviosRepository.deleteById(id);
  }
}
