import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MadecomDataSource} from '../datasources';
import {Carrito, CarritoRelations, Cliente, Ventas, Producto} from '../models';
import {ClienteRepository} from './cliente.repository';
import {VentasRepository} from './ventas.repository';
import {ProductoRepository} from './producto.repository';

export class CarritoRepository extends DefaultCrudRepository<
  Carrito,
  typeof Carrito.prototype.id,
  CarritoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Carrito.prototype.id>;

  public readonly ventas: BelongsToAccessor<Ventas, typeof Carrito.prototype.id>;

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Carrito.prototype.id>;

  constructor(
    @inject('datasources.madecom') dataSource: MadecomDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('VentasRepository') protected ventasRepositoryGetter: Getter<VentasRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Carrito, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.ventas = this.createBelongsToAccessorFor('ventas', ventasRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
