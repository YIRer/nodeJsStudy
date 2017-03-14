var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var FileStore = require('session-file-store')(session);
var bkfd2Password = require('pbkdf2-password');
var hasher = bkfd2Password();
var app = express();

var users= [
  {
    username : 'yir',
    password : 'oEB8kPn0BZpjXN+u1sxcfUFai2yBM0GFd+rvGrqxpsaSPX4eGaZ0qFuJ8xoju8hT9ywiubTUItAdoX9yNhQ5SyzxWnREyigrDwofGEvxF956t+tsZmpMxOF6NkC0kfzcN3B9W2r5WmFyGfAGTnaIbC+LFDhI2Zw6eNg0Ij5ERDI=',
    salt:'Yop+efg+EAjWEFiGsoMkJyiolZOF7kBPe6tda6ShFXR61xgB8s4Y5o0myR0zXOVfPiCOuBALzXDo6MNksy03WQ==',
    displayName: 'YIR'
  }
];

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: '!@#$%sshh^',
  resave: false,
  saveUninitialized: true,
  store:new FileStore()
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

  var nuser = req.body.username;
  var pwd = req.body.password;
  // console.log(pwd);
  // console.log(md5(pwd + users[1].salt));
  // console.log(users[1].password);
  // 로그인 처리
  for(var i = 0; i < users.length ; i++){
    var user = users[i];
    // if(nuser === user.username && sha256(pwd + user.salt) === user.password){
    //   req.session.displayName = user.displayName;
    //   return req.session.save(function(){
    //     res.redirect('/welcome');
    //   });
    // }
    if(nuser === user.username){
      return hasher({password:pwd, salt:user.salt}, function(err, pass, salt, hash){
        if(hash === user.password){
          req.session.displayName = user.displayName;
          req.session.save(function(){
            res.redirect('/welcome');
          });
        }else{
          res.send('get Out <a href="/auth/login">login</a>');
        }
      });
    }
  }
});

app.get('/welcome', function(req, res){
  console.log(req.session.displayName);
  if(req.session.displayName){
    res.send(`
        <h1>Hello, ${req.session.displayName}</h1>
        <a href="/auth/logout">Logout</a>
      `);
  }else{
    res.send(`
        <h1>Welcome</h1>
        <ul>
          <li>
            <a href="/auth/login">Login</a>
          </li>
          <li>
            <a href="/auth/register">register</a>
          </li>
        </ul>
    `);
  }

});
app.get('/auth/register', function(req,res){
  var output=`
  <h1>Register</h1>
  <form action="/auth/register" method="post">
    <p>
      <input type="text" name="username" placeholder="userName"
    </p>
    <p>
      <input type="password" name="password" placeholder="password">
    </p>
    <p>
      <input type="text" name="displayName" placeholder="displayName">
    </p>
    <input type="submit">
  </form>
  `;
  res.send(output);
});
app.post('/auth/register', function(req, res){
  hasher({password:req.body.password},function(err, pass, salt, hash){
    var user ={
      username:req.body.username,
      password:hash,
      salt:salt,
      displayName:req.body.displayName
    };
    users.push(user);
    req.session.displayName = req.body.displayName;
    req.session.save(function(){
      res.redirect('/welcome');
    });
  });
});

app.get('/auth/logout', function(req, res){

  delete req.session.displayName;
  req.session.save(function(){
    res.redirect('/welcome');
  });
});

app.listen(3000, function(){
  console.log('connect complate');
});
