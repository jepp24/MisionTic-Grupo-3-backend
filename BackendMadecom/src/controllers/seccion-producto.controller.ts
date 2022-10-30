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
  Seccion,
  Producto,
} from '../models';
import {SeccionRepository} from '../repositories';

export class SeccionProductoController {
  constructor(
    @repository(SeccionRepository) protected seccionRepository: SeccionRepository,
  ) { }

  @get('/seccions/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Seccion has many Producto',
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
    return this.seccionRepository.productos(id).find(filter);
  }

  @post('/seccions/{id}/productos', {
    responses: {
      '200': {
        description: 'Seccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Seccion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInSeccion',
            exclude: ['id'],
            optional: ['seccionId']
          }),
        },
      },
    }) producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.seccionRepository.productos(id).create(producto);
  }

  @patch('/seccions/{id}/productos', {
    responses: {
      '200': {
        description: 'Seccion.Producto PATCH success count',
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
    return this.seccionRepository.productos(id).patch(producto, where);
  }

  @del('/seccions/{id}/productos', {
    responses: {
      '200': {
        description: 'Seccion.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.seccionRepository.productos(id).delete(where);
  }
}
