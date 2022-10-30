import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MadecomDataSource} from '../datasources';
import {Carrito, CarritoRelations, Cliente, Productocarrito, Envios, Ventas} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ProductocarritoRepository} from './productocarrito.repository';
import {EnviosRepository} from './envios.repository';
import {VentasRepository} from './ventas.repository';

export class CarritoRepository extends DefaultCrudRepository<
  Carrito,
  typeof Carrito.prototype.id,
  CarritoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Carrito.prototype.id>;

  public readonly productocarritos: HasManyRepositoryFactory<Productocarrito, typeof Carrito.prototype.id>;

  public readonly envios: BelongsToAccessor<Envios, typeof Carrito.prototype.id>;

  public readonly ventas: BelongsToAccessor<Ventas, typeof Carrito.prototype.id>;

  constructor(
    @inject('datasources.madecom') dataSource: MadecomDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ProductocarritoRepository') protected productocarritoRepositoryGetter: Getter<ProductocarritoRepository>, @repository.getter('EnviosRepository') protected enviosRepositoryGetter: Getter<EnviosRepository>, @repository.getter('VentasRepository') protected ventasRepositoryGetter: Getter<VentasRepository>,
  ) {
    super(Carrito, dataSource);
    this.ventas = this.createBelongsToAccessorFor('ventas', ventasRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
    this.envios = this.createBelongsToAccessorFor('envios', enviosRepositoryGetter,);
    this.registerInclusionResolver('envios', this.envios.inclusionResolver);
    this.productocarritos = this.createHasManyRepositoryFactoryFor('productocarritos', productocarritoRepositoryGetter,);
    this.registerInclusionResolver('productocarritos', this.productocarritos.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
