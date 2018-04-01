import * as Sequelize from 'sequelize'
import db from '../db'

export default db.define('city', {
	cityId: Sequelize.STRING,
	cityName: Sequelize.STRING,
	cityVersion: Sequelize.STRING,
	hot: Sequelize.INTEGER,
	pinyin: Sequelize.STRING,
	supportSubway: Sequelize.INTEGER,
}, {
	freezeTableName: true,
})
