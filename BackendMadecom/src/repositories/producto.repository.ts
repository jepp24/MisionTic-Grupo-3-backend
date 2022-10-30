import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MadecomDataSource} from '../datasources';
import {Producto, ProductoRelations, Seccion, Productocarrito} from '../models';
import {SeccionRepository} from './seccion.repository';
import {ProductocarritoRepository} from './productocarrito.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly seccion: BelongsToAccessor<Seccion, typeof Producto.prototype.id>;

  public readonly productocarritos: HasManyRepositoryFactory<Productocarrito, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.madecom') dataSource: MadecomDataSource, @repository.getter('SeccionRepository') protected seccionRepositoryGetter: Getter<SeccionRepository>, @repository.getter('ProductocarritoRepository') protected productocarritoRepositoryGetter: Getter<ProductocarritoRepository>,
  ) {
    super(Producto, dataSource);
    this.productocarritos = this.createHasManyRepositoryFactoryFor('productocarritos', productocarritoRepositoryGetter,);
    this.registerInclusionResolver('productocarritos', this.productocarritos.inclusionResolver);
    this.seccion = this.createBelongsToAccessorFor('seccion', seccionRepositoryGetter,);
    this.registerInclusionResolver('seccion', this.seccion.inclusionResolver);
  }
}
