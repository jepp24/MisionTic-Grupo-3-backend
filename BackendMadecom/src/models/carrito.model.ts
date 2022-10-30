import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class Carrito extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  constructor(data?: Partial<Carrito>) {
    super(data);
  }
}

export interface CarritoRelations {
  // describe navigational properties here
}

export type CarritoWithRelations = Carrito & CarritoRelations;
