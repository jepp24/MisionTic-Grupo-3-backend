import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MadecomDataSource} from '../datasources';
import {Productocarrito, ProductocarritoRelations} from '../models';

export class ProductocarritoRepository extends DefaultCrudRepository<
  Productocarrito,
  typeof Productocarrito.prototype.id,
  ProductocarritoRelations
> {
  constructor(
    @inject('datasources.madecom') dataSource: MadecomDataSource,
  ) {
    super(Productocarrito, dataSource);
  }
}
