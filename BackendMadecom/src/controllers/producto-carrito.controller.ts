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
  Carrito,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoCarritoController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/carrito', {
    responses: {
      '200': {
        description: 'Carrito belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Carrito)},
          },
        },
      },
    },
  })
  async getCarrito(
    @param.path.string('id') id: typeof Producto.prototype.id,
  ): Promise<Carrito> {
    return this.productoRepository.carrito(id);
  }
}
