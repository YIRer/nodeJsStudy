var express =  require('express');
var bodyParser = require('body-parser')
var app = express();

app.locals.pretty = true;
app.set('views','./views');
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/views',function(req,res){

  res.render('views',{time:Date(),title:'asd'});
});
app.get('/',function(req,res){
  res.send('hello');
});
app.get('/form',function(req,res){
  res.render('form');
});
app.get('/form_receiver',function(req,res){
  // res.send('hello get');
  var title = req.query.title;
  var description = req.query.description;
  res.send(title +','+description);
});
app.post('/form_receiver',function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title +','+description);
});
app.get('/topic/:id',function(req,res){
  var topics = [
    'Javascript is ...',
    'Nodejs is ...',
    'Express is ...',
  ];
  var links = `
  <a href="/topic/0">JS</a><br>
  <a href="/topic/1">Node</a><br>
  <a href="/topic/2">Express</a><br><br>
  ${topics[req.params.id]}
  `;
  res.send(links);
});

app.get('/topic/:id/:mode',function(req,res){
  res.send(req.params.id+','+req.params.mode);
});
app.get('/route',function(req,res){
  res.send('<img src="/nono.jpg" />');
});
app.listen(3000,function(){
  console.log('3000port');
});
