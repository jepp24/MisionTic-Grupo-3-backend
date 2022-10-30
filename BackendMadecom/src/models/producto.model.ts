import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Seccion} from './seccion.model';
import {Productocarrito} from './productocarrito.model';

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

  @belongsTo(() => Seccion)
  seccionId: string;

  @hasMany(() => Productocarrito)
  productocarritos: Productocarrito[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
