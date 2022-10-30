import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Roles,
  Usuarios,
} from '../models';
import {RolesRepository} from '../repositories';

export class RolesUsuariosController {
  constructor(
    @repository(RolesRepository)
    public rolesRepository: RolesRepository,
  ) { }

  @get('/roles/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios belonging to Roles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.string('id') id: typeof Roles.prototype.id,
  ): Promise<Usuarios> {
    return this.rolesRepository.usuarios(id);
  }
}
