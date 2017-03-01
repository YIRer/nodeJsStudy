var Oriento = require('oriento');

var server = Oriento({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: '1234'
});

var db = server.use('testDB');

// db.record.get('#22:0').then(function (record) {
//   console.log('Loaded record:', record);
// });

/*
  CREATE
  READ
  UPDATE
  DELETE

  CRUD

*/

// var sql = 'SELECT FROM topic';
// db.query(sql).then(function(results){
//   console.log(results);
// });
// var sql = 'SELECT FROM topic WHERE @rid=:rid';
// var param = {
//   params : {
//     rid:'#21:0'
//   }
// };
// db.query(sql,param).then(function(results){
//   console.log(results);
// });

// var sql = "INSERT INTO topic (title, description) VALUES(:title, :desc)";
//
// db.query(sql,{
//   params :{
//     title : 'Express',
//     desc:'Express is framework for web'
//   }
// }).then(function(results){
//   console.log(results);
// });
//
// var sql = "UPDATE topic SET title=:title WHERE @rid=:rid";
// db.query(sql, {params:{title:'ExpressJS',rid:"#21:4"}}).then(function(results){
//   console.log(results);
// })

var sql = "DELETE FROM topic WHERE @rid=:rid";
db.query(sql,{params:{rid:'#21:4'}}).then(function(results){
  console.log(results);
})
