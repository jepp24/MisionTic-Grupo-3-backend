import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Seccion} from './seccion.model';
import {Carrito} from './carrito.model';

@model()
export class Producto extends Entity {
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
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @belongsTo(() => Seccion)
  seccionId: string;

  @belongsTo(() => Carrito)
  carritoId: string;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
