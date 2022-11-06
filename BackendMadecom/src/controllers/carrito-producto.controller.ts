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
  Producto,
} from '../models';
import {CarritoRepository} from '../repositories';

export class CarritoProductoController {
  constructor(
    @repository(CarritoRepository) protected carritoRepository: CarritoRepository,
  ) { }

  @get('/carritos/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Carrito has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.carritoRepository.productos(id).find(filter);
  }

  @post('/carritos/{id}/productos', {
    responses: {
      '200': {
        description: 'Carrito model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Carrito.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInCarrito',
            exclude: ['id'],
            optional: ['carritoId']
          }),
        },
      },
    }) producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.carritoRepository.productos(id).create(producto);
  }

  @patch('/carritos/{id}/productos', {
    responses: {
      '200': {
        description: 'Carrito.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.carritoRepository.productos(id).patch(producto, where);
  }

  @del('/carritos/{id}/productos', {
    responses: {
      '200': {
        description: 'Carrito.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.carritoRepository.productos(id).delete(where);
  }
}
