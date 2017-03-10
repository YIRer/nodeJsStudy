var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var MySQLStore = require('express-mysql-session')(session);
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: '!@#$%sshh^',
  resave: false,
  saveUninitialized: true,
  store:new MySQLStore({
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456',
    database:'o2'
  })
}));

app.get('/count', function(req, res){
  if(req.session.count){
    req.session.count++;
  }else{
    req.session.count = 1;
  }

  res.send('hi' + req.session.count);
});

app.get('/auth/login', function(req, res){
  var output = `
  <h1>Login</h1>
  <form action="/auth/login" method="post">
    <p>
      <input type="text" name="username" placeholder="userName"
    </p>
    <p>
      <input type="password" name="password" placeholder="password">
    </p>
    <input type="submit">
  </form>
  `;

  res.send(output);
});

app.post('/auth/login', function(req, res){
  var user = {
    username : 'yir',
    password : '1234',
    displayName: 'YIR'
  };
  var nuser = req.body.username;
  var pwd = req.body.password;

  // 로그인 처리
  if(nuser === user.username && pwd === user.password){
    req.session.displayName = user.displayName;
    req.session.save(function(){
      res.redirect('/welcome');
    });
  }else{
    res.send('get out <a href="/auth/login">login</a>');
  }
});
app.get('/auth/logout', function(req, res){
  delete req.session.displayName;
  req.session.save(function(){
    res.redirect('/welcome');
  });

});


app.get('/welcome', function(req, res){
  if(req.session.displayName){
    res.send(`
        <h1>Hello, ${req.session.displayName}</h1>
        <a href="/auth/logout">Logout</a>
      `);
  }else{
    res.send(`
        <h1>Welcome</h1>
        <a href="/auth/login">Login</a>
    `);
  }

});

app.listen(3000, function(){
  console.log('connect complate');
});
