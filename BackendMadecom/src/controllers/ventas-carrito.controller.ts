import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Ventas,
  Carrito,
} from '../models';
import {VentasRepository} from '../repositories';

export class VentasCarritoController {
  constructor(
    @repository(VentasRepository) protected ventasRepository: VentasRepository,
  ) { }

  @get('/ventas/{id}/carritos', {
    responses: {
      '200': {
        description: 'Array of Ventas has many Carrito',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Carrito)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Carrito>,
  ): Promise<Carrito[]> {
    return this.ventasRepository.carritos(id).find(filter);
  }

  @post('/ventas/{id}/carritos', {
    responses: {
      '200': {
        description: 'Ventas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Carrito)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ventas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carrito, {
            title: 'NewCarritoInVentas',
            exclude: ['id'],
            optional: ['ventasId']
          }),
        },
      },
    }) carrito: Omit<Carrito, 'id'>,
  ): Promise<Carrito> {
    return this.ventasRepository.carritos(id).create(carrito);
  }

  @patch('/ventas/{id}/carritos', {
    responses: {
      '200': {
        description: 'Ventas.Carrito PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carrito, {partial: true}),
        },
      },
    })
    carrito: Partial<Carrito>,
    @param.query.object('where', getWhereSchemaFor(Carrito)) where?: Where<Carrito>,
  ): Promise<Count> {
    return this.ventasRepository.carritos(id).patch(carrito, where);
  }

  @del('/ventas/{id}/carritos', {
    responses: {
      '200': {
        description: 'Ventas.Carrito DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Carrito)) where?: Where<Carrito>,
  ): Promise<Count> {
    return this.ventasRepository.carritos(id).delete(where);
  }
}
