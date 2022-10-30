import {Entity, model, property} from '@loopback/repository';

@model()
export class Productocarrito extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  idproducto: string;

  @property({
    type: 'string',
    required: true,
  })
  idcarrito: string;

  @property({
    type: 'string',
  })
  productoId?: string;

  @property({
    type: 'string',
  })
  carritoId?: string;

  constructor(data?: Partial<Productocarrito>) {
    super(data);
  }
}

export interface ProductocarritoRelations {
  // describe navigational properties here
}

export type ProductocarritoWithRelations = Productocarrito & ProductocarritoRelations;
