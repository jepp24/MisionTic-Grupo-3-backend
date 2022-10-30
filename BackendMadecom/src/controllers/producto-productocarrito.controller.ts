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
  Producto,
  Productocarrito,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoProductocarritoController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/productocarritos', {
    responses: {
      '200': {
        description: 'Array of Producto has many Productocarrito',
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
    return this.productoRepository.productocarritos(id).find(filter);
  }

  @post('/productos/{id}/productocarritos', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productocarrito)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productocarrito, {
            title: 'NewProductocarritoInProducto',
            exclude: ['idproducto'],
            optional: ['productoId']
          }),
        },
      },
    }) productocarrito: Omit<Productocarrito, 'idproducto'>,
  ): Promise<Productocarrito> {
    return this.productoRepository.productocarritos(id).create(productocarrito);
  }

  @patch('/productos/{id}/productocarritos', {
    responses: {
      '200': {
        description: 'Producto.Productocarrito PATCH success count',
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
    return this.productoRepository.productocarritos(id).patch(productocarrito, where);
  }

  @del('/productos/{id}/productocarritos', {
    responses: {
      '200': {
        description: 'Producto.Productocarrito DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Productocarrito)) where?: Where<Productocarrito>,
  ): Promise<Count> {
    return this.productoRepository.productocarritos(id).delete(where);
  }
}
