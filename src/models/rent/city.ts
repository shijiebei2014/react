import * as Sequelize from 'sequelize'
import db from '../../db'

export default db.define('city', {
	cityName: Sequelize.STRING,
	provinceName: Sequelize.STRING,
    _58_domain: Sequelize.STRING
}, {
	freezeTableName: true,
})
