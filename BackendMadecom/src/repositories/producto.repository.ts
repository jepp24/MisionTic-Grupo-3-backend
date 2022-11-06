import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MadecomDataSource} from '../datasources';
import {Producto, ProductoRelations, Seccion, Carrito} from '../models';
import {SeccionRepository} from './seccion.repository';
import {CarritoRepository} from './carrito.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly seccion: BelongsToAccessor<Seccion, typeof Producto.prototype.id>;

  public readonly carrito: BelongsToAccessor<Carrito, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.madecom') dataSource: MadecomDataSource, @repository.getter('SeccionRepository') protected seccionRepositoryGetter: Getter<SeccionRepository>, @repository.getter('CarritoRepository') protected carritoRepositoryGetter: Getter<CarritoRepository>,
  ) {
    super(Producto, dataSource);
    this.carrito = this.createBelongsToAccessorFor('carrito', carritoRepositoryGetter,);
    this.registerInclusionResolver('carrito', this.carrito.inclusionResolver);
    this.seccion = this.createBelongsToAccessorFor('seccion', seccionRepositoryGetter,);
    this.registerInclusionResolver('seccion', this.seccion.inclusionResolver);
  }
}
