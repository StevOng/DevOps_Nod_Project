import express from 'express'
import User from '../users.js'
import userAuth from '../../controllers/user.js'

const router = express.Router()

router.get('/login',userAuth.login)
router.post('/login',userAuth.auth)

router.get('/logout',userAuth.logout)

router.get('/register',userAuth.register)
router.post('/register',userAuth.regist)

router.get('/profile', userAuth.profile)
router.get('/delete', userAuth.accDel)
router.get('/edit', userAuth.renEdit)
router.post('/edit', userAuth.accEdit)

router.get('/create_user_db', (req,res) => {
    User.sync({alter:true})
    res.end('User table created')
})

router.get('/dropUserDb', (req,res) => {
    User.drop()
    res.end('User table remove')
})

export default router