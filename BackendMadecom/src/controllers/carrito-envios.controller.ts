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
  Envios,
} from '../models';
import {CarritoRepository} from '../repositories';

export class CarritoEnviosController {
  constructor(
    @repository(CarritoRepository)
    public carritoRepository: CarritoRepository,
  ) { }

  @get('/carritos/{id}/envios', {
    responses: {
      '200': {
        description: 'Envios belonging to Carrito',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Envios)},
          },
        },
      },
    },
  })
  async getEnvios(
    @param.path.string('id') id: typeof Carrito.prototype.id,
  ): Promise<Envios> {
    return this.carritoRepository.envios(id);
  }
}
