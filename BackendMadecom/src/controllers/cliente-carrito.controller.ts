import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Carrito,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteCarritoController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/carrito', {
    responses: {
      '200': {
        description: 'Carrito belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Carrito)},
          },
        },
      },
    },
  })
  async getCarrito(
    @param.path.string('id') id: typeof Cliente.prototype.id,
  ): Promise<Carrito> {
    return this.clienteRepository.carrito(id);
  }
}
