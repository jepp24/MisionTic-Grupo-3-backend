import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MadecomDataSource} from '../datasources';
import {Roles, RolesRelations, Usuarios} from '../models';
import {UsuariosRepository} from './usuarios.repository';

export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.id,
  RolesRelations
> {

  public readonly usuarios: BelongsToAccessor<Usuarios, typeof Roles.prototype.id>;

  constructor(
    @inject('datasources.madecom') dataSource: MadecomDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(Roles, dataSource);
    this.usuarios = this.createBelongsToAccessorFor('usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
