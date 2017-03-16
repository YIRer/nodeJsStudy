var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var FileStore = require('session-file-store')(session);
var bkfd2Password = require('pbkdf2-password');
var hasher = bkfd2Password();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

var users= [
  {
    authId: 'local:yir',
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

//passport
app.use(passport.initialize());
// session 설정 밑에
app.use(passport.session());





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
  <a href="/auth/facebook">FACEBOOK</a>
  `;

  res.send(output);
});


// app.post('/auth/login', function(req, res){
//
//   var nuser = req.body.username;
//   var pwd = req.body.password;
//   // console.log(pwd);
//   // console.log(md5(pwd + users[1].salt));
//   // console.log(users[1].password);
//   // 로그인 처리
//   for(var i = 0; i < users.length ; i++){
//     var user = users[i];
//     // if(nuser === user.username && sha256(pwd + user.salt) === user.password){
//     //   req.session.displayName = user.displayName;
//     //   return req.session.save(function(){
//     //     res.redirect('/welcome');
//     //   });
//     // }
//     if(nuser === user.username){
//       return hasher({password:pwd, salt:user.salt}, function(err, pass, salt, hash){
//         if(hash === user.password){
//           req.session.displayName = user.displayName;
//           req.session.save(function(){
//             res.redirect('/welcome');
//           });
//         }else{
//           res.send('get Out <a href="/auth/login">login</a>');
//         }
//       });
//     }
//   }
// });

passport.serializeUser(function(user, done) {
  done(null, user.authId);
});
passport.deserializeUser(function(id, done) {
  console.log('deserializeUser' + id);
  for(var i=0; i<users.length; i++){
    var user = users[i];
    if(user.authId === id){
      return done(null, user);
    }
  }
});

// passport.deserializeUser(function(id, done) {
//   for(var i = 0; i < users.length ; i++){
//     var user = users[i];
//
//     if(user.authId){
//
//     }
//
//   }
//   return  done(null, user);
// });
passport.use(new LocalStrategy(
  function(username, password, done){
    var nuser = username;
    var pwd = password;
      for(var i = 0; i < users.length ; i++){
        var user = users[i];
        if(nuser === user.username){
          return hasher({password:pwd, salt:user.salt}, function(err, pass, salt, hash){
            if(hash === user.password){
                        done(null, user);
            }else{
              done(null,false);
            }
          });
        }
        done(null,false);
      }
  }
));

passport.use(new FacebookStrategy({
    clientID: "1365313676863351",
    clientSecret: "1feae3724db53c8882704d897e7d055f",
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {

    var authId = 'facebook:' + profile.id;
    for(var i = 0; i <users.length ; i++){
      var user = users[i];
      if(user.authId === authId){
        return done(null, user);
      }
    }
    var newUser = {
      'authId' : authId,
      'displayName' : profile.displayName
    };
    users.push(newUser);
    done(null, newUser);
  }
));

app.post('/auth/login',
  passport.authenticate('local',
  { failureRedirect: '/auth/login',
    failureFlash: false
  }), function(req, res){
    req.session.save(function(){
      res.redirect('/welcome');
    });
  }

);

app.get('/auth/facebook',
  passport.authenticate(
    'facebook'
  )
);
app.get('/auth/facebook/callback',
  passport.authenticate(
    'facebook',
    {
      successRedirect: '/welcome',
      failureRedirect: '/auth/login'
    }
  )
);

app.get('/welcome', function(req, res){
  if(req.user && req.user.displayName){
    res.send(`
        <h1>Hello, ${req.user.displayName}</h1>
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
      authId:'local:'+req.body.username,
      username:req.body.username,
      password:hash,
      salt:salt,
      displayName:req.body.displayName
    };
    users.push(user);
    console.log(users);
    req.login(user,function(){
      req.session.save(function(){
        res.redirect('/welcome');
      });
    });
  });
});

app.get('/auth/logout', function(req, res){
  req.logOut();
  console.log(users);
  req.session.save(function(){
    res.redirect('/welcome');
  });
});

app.listen(3000, function(){
  console.log('connect complate');
});
