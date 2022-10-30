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
  Cliente,
} from '../models';
import {CarritoRepository} from '../repositories';

export class CarritoClienteController {
  constructor(
    @repository(CarritoRepository)
    public carritoRepository: CarritoRepository,
  ) { }

  @get('/carritos/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Carrito',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Carrito.prototype.id,
  ): Promise<Cliente> {
    return this.carritoRepository.cliente(id);
  }
}
