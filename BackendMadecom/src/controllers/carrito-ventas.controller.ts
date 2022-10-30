import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Carrito,
  Ventas,
} from '../models';
import {CarritoRepository} from '../repositories';

export class CarritoVentasController {
  constructor(
    @repository(CarritoRepository)
    public carritoRepository: CarritoRepository,
  ) { }

  @get('/carritos/{id}/ventas', {
    responses: {
      '200': {
        description: 'Ventas belonging to Carrito',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ventas)},
          },
        },
      },
    },
  })
  async getVentas(
    @param.path.string('id') id: typeof Carrito.prototype.id,
  ): Promise<Ventas> {
    return this.carritoRepository.ventas(id);
  }
}
