import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MadecomDataSource} from '../datasources';
import {Usuarios, UsuariosRelations} from '../models';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.id,
  UsuariosRelations
> {
  constructor(
    @inject('datasources.madecom') dataSource: MadecomDataSource,
  ) {
    super(Usuarios, dataSource);
  }
}
