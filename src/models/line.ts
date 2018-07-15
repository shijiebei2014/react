import * as Sequelize from 'sequelize'
import db from '../db'

export default db.define('line', {
		lineId: Sequelize.STRING,
		lineNo: Sequelize.STRING,
		name: Sequelize.STRING,
		endSn: Sequelize.STRING,
	}, {
		freezeTableName: true,
	})