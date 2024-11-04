import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize('mydb', 'myuser', 'mypassword', {
  host: 'mysql',
  dialect: 'mysql'
})

export { sequelize, DataTypes }
