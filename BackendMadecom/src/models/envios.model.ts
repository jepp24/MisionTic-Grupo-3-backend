import {Entity, model, property} from '@loopback/repository';

@model()
export class Envios extends Entity {
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
  empresa: string;


  constructor(data?: Partial<Envios>) {
    super(data);
  }
}

export interface EnviosRelations {
  // describe navigational properties here
}

export type EnviosWithRelations = Envios & EnviosRelations;
