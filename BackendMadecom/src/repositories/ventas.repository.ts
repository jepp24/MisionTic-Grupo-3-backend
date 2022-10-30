import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MadecomDataSource} from '../datasources';
import {Ventas, VentasRelations} from '../models';

export class VentasRepository extends DefaultCrudRepository<
  Ventas,
  typeof Ventas.prototype.id,
  VentasRelations
> {
  constructor(
    @inject('datasources.madecom') dataSource: MadecomDataSource,
  ) {
    super(Ventas, dataSource);
  }
}
