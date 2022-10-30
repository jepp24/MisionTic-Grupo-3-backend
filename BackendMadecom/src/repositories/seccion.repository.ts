import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MadecomDataSource} from '../datasources';
import {Seccion, SeccionRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class SeccionRepository extends DefaultCrudRepository<
  Seccion,
  typeof Seccion.prototype.id,
  SeccionRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Seccion.prototype.id>;

  constructor(
    @inject('datasources.madecom') dataSource: MadecomDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Seccion, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
