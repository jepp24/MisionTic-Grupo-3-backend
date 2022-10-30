import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MadecomDataSource} from '../datasources';
import {Cliente, ClienteRelations, Carrito} from '../models';
import {CarritoRepository} from './carrito.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly carrito: BelongsToAccessor<Carrito, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.madecom') dataSource: MadecomDataSource, @repository.getter('CarritoRepository') protected carritoRepositoryGetter: Getter<CarritoRepository>,
  ) {
    super(Cliente, dataSource);
    this.carrito = this.createBelongsToAccessorFor('carrito', carritoRepositoryGetter,);
    this.registerInclusionResolver('carrito', this.carrito.inclusionResolver);
  }
}
