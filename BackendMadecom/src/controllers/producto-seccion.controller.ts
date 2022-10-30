import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Producto,
  Seccion,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoSeccionController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/seccion', {
    responses: {
      '200': {
        description: 'Seccion belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Seccion)},
          },
        },
      },
    },
  })
  async getSeccion(
    @param.path.string('id') id: typeof Producto.prototype.id,
  ): Promise<Seccion> {
    return this.productoRepository.seccion(id);
  }
}
