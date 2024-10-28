import { Sequelize,DataTypes } from "sequelize";

const sequelize = new Sequelize('artileg', 'root','', {
    host: 'localhost',
    dialect: 'mysql'
})

export {sequelize,DataTypes} 