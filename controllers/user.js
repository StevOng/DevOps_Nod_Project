import User from '../models/users.js'
import bcrypt from 'bcryptjs'

const login = (req, res, next) => {
  const msg = req.session.err || ''
  req.session.err = ''
  if (req.session.user) {
    res.redirect('/')
  } else {
    res.render('login', { user: req.session.user || '', message: msg })
  }
}

const logout = (req, res, next) => {
  req.session.destroy()
  res.redirect('/login')
}

const auth = (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password
  }
  req.session.err = ''
  User.findOne({ where: { email: data.email } }).then(result => {
    if (!result) {
      req.session.err = 'Incorrect email or password'
      res.redirect('/login')
    } else {
      const validPass = bcrypt.compareSync(data.password, result.password)
      if (!validPass) {
        req.session.err = 'Incorrect password'
        res.redirect('/login')
      } else {
        req.session.err = ''
        req.session.user = result
        res.redirect('/')
      }
    }
  })
}

const hashPasswordAndValidate = async (password) => {
  if (password.length < 4) {
    return { error: 'Password must be at least 4 characters' }
  }
  const hashed = await bcrypt.hash(password, 10)
  return { hashed }
}

const register = (req, res, next) => {
  const err = req.session.err || ''
  req.session.user = ''
  res.render('register', { msg: err })
}

const regist = async (req, res, next) => {
  const { error, hashed } = await hashPasswordAndValidate(req.body.password)
  if (error) {
    req.session.err = error
    res.redirect('/register')
  } else {
    await User.create({
      email: req.body.email,
      username: req.body.username,
      password: hashed
    })
    req.session.err = ''
    res.redirect('/login')
  }
}

const profile = (req, res, next) => {
  User.findAll().then(() => {
    res.render('profile', { user: req.session.user || '' })
  })
}

const accDel = async (req, res, next) => {
  await User.destroy({ where: { id: req.session.user.id } })
  req.session.user = ''
  res.redirect('/login')
}

const renEdit = (req, res, next) => {
  const errs = req.session.err || ''
  res.render('edit', { msg: errs, user: req.session.user || '' })
}

const accEdit = async (req, res, next) => {
  const { error, hashed } = await hashPasswordAndValidate(req.body.password)
  if (error) {
    req.session.err = error
    res.redirect('/edit')
  } else {
    await User.update(
      {
        email: req.body.email,
        username: req.body.username,
        password: hashed
      },
      { where: { id: req.session.user.id } }
    )
    req.session.user = ''
    res.redirect('/login')
  }
}

export default { login, logout, auth, regist, register, profile, accDel, renEdit, accEdit }
