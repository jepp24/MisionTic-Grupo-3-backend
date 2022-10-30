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
  Carrito,
  Productocarrito,
} from '../models';
import {CarritoRepository} from '../repositories';

export class CarritoProductocarritoController {
  constructor(
    @repository(CarritoRepository) protected carritoRepository: CarritoRepository,
  ) { }

  @get('/carritos/{id}/productocarritos', {
    responses: {
      '200': {
        description: 'Array of Carrito has many Productocarrito',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Productocarrito)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Productocarrito>,
  ): Promise<Productocarrito[]> {
    return this.carritoRepository.productocarritos(id).find(filter);
  }

  @post('/carritos/{id}/productocarritos', {
    responses: {
      '200': {
        description: 'Carrito model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productocarrito)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Carrito.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productocarrito, {
            title: 'NewProductocarritoInCarrito',
            exclude: ['id'],
            optional: ['carritoId']
          }),
        },
      },
    }) productocarrito: Omit<Productocarrito, 'id'>,
  ): Promise<Productocarrito> {
    return this.carritoRepository.productocarritos(id).create(productocarrito);
  }

  @patch('/carritos/{id}/productocarritos', {
    responses: {
      '200': {
        description: 'Carrito.Productocarrito PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productocarrito, {partial: true}),
        },
      },
    })
    productocarrito: Partial<Productocarrito>,
    @param.query.object('where', getWhereSchemaFor(Productocarrito)) where?: Where<Productocarrito>,
  ): Promise<Count> {
    return this.carritoRepository.productocarritos(id).patch(productocarrito, where);
  }

  @del('/carritos/{id}/productocarritos', {
    responses: {
      '200': {
        description: 'Carrito.Productocarrito DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Productocarrito)) where?: Where<Productocarrito>,
  ): Promise<Count> {
    return this.carritoRepository.productocarritos(id).delete(where);
  }
}
