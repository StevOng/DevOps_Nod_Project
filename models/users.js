import { sequelize, DataTypes } from './model.js'

const User = sequelize.define('users', {
  id: {
    type: DataTypes.TINYINT,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  }
})

export default User
