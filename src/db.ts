import * as Sequelize from 'sequelize'

export default new Sequelize('rent', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});