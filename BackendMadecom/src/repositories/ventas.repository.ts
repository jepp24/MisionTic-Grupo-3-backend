import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MadecomDataSource} from '../datasources';
import {Ventas, VentasRelations, Carrito} from '../models';
import {CarritoRepository} from './carrito.repository';

export class VentasRepository extends DefaultCrudRepository<
  Ventas,
  typeof Ventas.prototype.id,
  VentasRelations
> {

  public readonly carritos: HasManyRepositoryFactory<Carrito, typeof Ventas.prototype.id>;

  constructor(
    @inject('datasources.madecom') dataSource: MadecomDataSource, @repository.getter('CarritoRepository') protected carritoRepositoryGetter: Getter<CarritoRepository>,
  ) {
    super(Ventas, dataSource);
    this.carritos = this.createHasManyRepositoryFactoryFor('carritos', carritoRepositoryGetter,);
    this.registerInclusionResolver('carritos', this.carritos.inclusionResolver);
  }
}
