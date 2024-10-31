import { Sequelize,DataTypes } from "sequelize";

const sequelize = new Sequelize('mydatabase', 'myuser','mypassword', {
    host: 'mysql',
    dialect: 'mysql'
})

export {sequelize,DataTypes} 