import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'madecom',
  connector: 'mongodb',
  url: 'mongodb+srv://prog_web:Mintic22.@clusterprogweb.30llv6u.mongodb.net/MadecomBD?retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MadecomDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'madecom';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.madecom', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
