import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MadecomDataSource} from '../datasources';
import {Envios, EnviosRelations} from '../models';

export class EnviosRepository extends DefaultCrudRepository<
  Envios,
  typeof Envios.prototype.id,
  EnviosRelations
> {
  constructor(
    @inject('datasources.madecom') dataSource: MadecomDataSource,
  ) {
    super(Envios, dataSource);
  }
}
