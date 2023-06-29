const express = require('express');
const app = express();
const User = require("./config/database.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');



// view engine
app.set('view engine','ejs')
app.use(express.urlencoded({extended: true}))



// session
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ 
    mongoUrl:'mongodb+srv://tofikabdu:X8kT8NCcvx0wKJQ0@nodejsauth.heonew2.mongodb.net/ ' ,
    collectionName : 'session'
  }),
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24 
  }
}))
 

//passport configuration
require('./config/passport.js')
app.use(passport.initialize())
app.use(passport.session())


app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.get('/login',(req,res)=>{
  res.render('login')
})


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/callback', 
  passport.authenticate('google', { failureRedirect: '/login' , successRedirect : '/protected'})
);



app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/login');
  });
});



app.get('/protected',(req,res)=>{
  if (req.user){
    res.render('protected',{name : req.user.username})
  } else {
    res.redirect('login')
  }
})












app.listen(3000, () => {
  console.log('Server started on port 3000');
});
