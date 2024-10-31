import User from "../models/users.js"
import bcrypt from 'bcryptjs'

const login = (req,res,next) => {
    let msg = req.session.err || ""
    req.session.err = ""
    if(req.session.user) {
        res.redirect('/')
    } else {
        res.render('login', {user: req.session.user || "", message: msg})
    }
}

const logout = (req,res,next) => {
    req.session.destroy()
    res.redirect('/login')
}

const auth = (req,res,next) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    }
    req.session.err = ""
    User.findOne({where: {email: data.email}}).then(result => {
        if(!result) {
            req.session.err = "Incorrect email or password"
            res.redirect('/login')
        }
        else {
            let validPass = bcrypt.compareSync(data.password, result.password)
            if(!validPass) {
                req.session.err = "Incorrect password"
                res.redirect('/login')
            }
            else {
                req.session.err = ""
                req.session.user = result
                res.redirect('/')
            }
        }
    }) 
}

const register = (req,res,next) => {
    let err = req.session.err || ""
    req.session.user = ""
    res.render('register',{msg: err})
}

const regist = async(req,res,next) => {
    let myPass = req.body.password
    let hashed = await bcrypt.hash(myPass,10)
    if(myPass.length < 4){
        req.session.err = "Password must at least 4 character"
        res.redirect('/register')
    }
    else {
        let result = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: hashed
        })
        req.session.err = ""
        res.redirect('/login')
    }
}

const profile = (req,res,next) => {
    User.findAll().then(() => {
        res.render('profile', {user: req.session.user ||""})
    })
}

const accDel = async(req,res,next) => {
    await User.destroy({where: {id: req.session.user.id}})
    req.session.user = ""
    res.redirect('/login')
}

const renEdit = (req,res,next) => {
    let err = req.session.err || ""
    res.render('edit',{msg: err, user: req.session.user||""}) 
}

const accEdit = async(req,res,next) => {
    let myPass = req.body.password
    let hashed = await bcrypt.hash(myPass,10)
    if(myPass.length < 4){
        req.session.err = "Password must at least 4 character"
        res.redirect('/edit')
    } else {
        await User.update({
            email: req.body.email,
            username: req.body.username,
            password: hashed
        }, {where: {id: req.session.user.id}})
        req.session.user = ""
        res.redirect('/login')
    }
}

export default {login,logout,auth,regist,register,profile,accDel,renEdit,accEdit}