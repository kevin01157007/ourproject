if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const express = require('express')
  const app = express()
  const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGO_URL);
  const db = mongoose.connection;

// 與資料庫連線發生錯誤時
db.on('error', console.error.bind(console, 'Connection fails!'));

// 與資料庫連線成功連線時
db.once('open', function () {
    console.log('Connected to database...');
});

  const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
  app.use( express.static( "views" ) );
  app.use('/go-board-final-project/MENU', express.static('go-board-final-project/MENU'));
  app.use('/go-board-final-project/board', express.static('go-board-final-project/board'));
  app.use('/go-board-final-project/首頁', express.static('go-board-final-project/首頁'));
  app.use('/go-board-final-project/dielife', express.static('go-board-final-project/dielife'));
  app.use('/go-board-final-project/history', express.static('go-board-final-project/history'));
  app.use('/go-board-final-project/rule', express.static('go-board-final-project/rule'));
  app.use('/go-board-final-project/wgo.js-master', express.static('go-board-final-project/wgo.js-master'));
  app.use('/go-board-final-project/wgo.js-master/死活題/tsumego', express.static('go-board-final-project/wgo.js-master/死活題/tsumego'));
  app.use('/go-board-final-project/celebrity', express.static('go-board-final-project/celebrity'));
  const bcrypt = require('bcrypt')
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')
  
  const initializePassport = require('./passport-config')
  initializePassport(
    passport,
    email => User.findOne({ email: email }),
    id => User.findById(id)
  )
  
  
  app.set('view-engine', 'ejs')
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    secret: 'your secret string',
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))
  app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
  })
  
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
  
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  
  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
  
  app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });
      await user.save();
      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
  })
  
  app.delete('/logout', (req, res) => {
    req.logOut(err => {
      if (err) {
        return next(err);
      }
      return res.redirect('/login');
    });
  });
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }
  
  app.listen(3000)