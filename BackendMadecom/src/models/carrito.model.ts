import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Producto} from './producto.model';
import {Ventas} from './ventas.model';

@model()
export class Carrito extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tarjeta: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaestimada: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Ventas)
  ventasId: string;

  @hasMany(() => Producto)
  productos: Producto[];

  constructor(data?: Partial<Carrito>) {
    super(data);
  }
}

export interface CarritoRelations {
  // describe navigational properties here
}

export type CarritoWithRelations = Carrito & CarritoRelations;
