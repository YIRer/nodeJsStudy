function nameMaker(name, cnt){
  var name_1 = name.split('.')[0];
  var name_2 = name.split('.')[1];

  return name_1 +'_'+ cnt +'.'+ name_2;
}
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file.mimetype.split('/')[1]);
    var fileType = file.mimetype.split('/')[0];
    var path = 'uploads/'+fileType;
    if(!fs.existsSync (path)){
      fs.mkdir(path);
      cb(null, path);
    }else{
      cb(null, path);
    }
  },
  filename: function (req, file, cb) {
  var fileType = file.mimetype.split('/')[0];
  var path = 'uploads/'+fileType;
  fs.readdir(path, function(err, files){
    var cnt = 0;
    for(var i = 0; i<files.length; i++){
        if(files[i].indexOf(file.originalname) < 0 || files[i].indexOf(file.originalname) === 0){
        cnt++;

      }
    }
    console.log(cnt);
    if(cnt > 0){
      cb(null, nameMaker(file.originalname, cnt));

    }else{
      cb(null, file.originalname);
    }
  })

  }
});
var upload = multer({ storage:_storage });
var fs = require('fs');
var app = express();

app.locals.pretty = true;
app.use('/user', express.static('uploads'));
app.set('views','./views_file');
app.set('view engine','jade');

app.use(bodyParser.urlencoded({ extended: false }));
app.get('/upload', function(req, res){
  res.render('upload');
});
app.post('/upload', upload.single('userfile'), function(req, res){
  console.log(req.file.mimetype);
  res.send('uploaded'+req.file.filename);
})
app.get('/topic/new',function(req,res){
  fs.readdir('data',function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('internal Server Error');
    };
    res.render('new', {topics:files});
  });
});
app.get(['/topic', '/topic/:id'], function(req,res){
  fs.readdir('data',function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('internal Server Error');
    };
    var id = req.params.id;
    if(id){
      fs.readFile('data/'+id, 'utf-8', function(err, data){
        if(err){
          console.log(err);
          res.status(500).send('internal Server Error');
        };

        res.render('view', {topics:files, title:id, description:data});
      });
    }else{
      res.render('view', {topics:files, title:'Welcome', description:'hello'});
    };
  });
});
app.post('/topic',function(req,res){
  var title =  req.body.title;
  var description =  req.body.description;
  fs.writeFile('data/'+title, description, function(err){
    if(err){
      console.log(err);
      res.status(500).send('internal Server Error');
    }
    res.redirect('/topic/'+title);
  });
});

app.listen(3000, function(){
  console.log('connnected 3000 port');
});
