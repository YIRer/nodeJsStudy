var Oriento = require('oriento');

var server = Oriento({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: '1234'
});

var db = server.use('o2');
//
// db.record.get('#21:0').then(function (record) {
//   console.log('Loaded record:', record);
// });
// create
// var sql = 'SELECT FROM topic';
// db.query(sql).then(function(results){
//   console.log(results);
// })
//
// var sql ="SELECT FROM topic WHERE @rid=:rid";
// var param ={
//   params :{
//     rid:'#21:0'
//   }
// };
// db.query(sql,param).then(function(results){
//   console.log(results);
// });

// insert
// var sql ="INSERT INTO topic (title,description) VALUES(:title, :desc)";
// var param ={
//     params:{
//       title:'Express',
//       desc:'Express is jsFW'
//     }
// };
// db.query(sql, param).then(function(results){
//   console.log(results);
//
// });

// update
//
// var sql = "UPDATE topic SET title=:title WHERE @rid=:rid";
// db.query(sql,{params:{title:"Express JS", rid:"#21:1"}}).then(function(results){
//   console.log(results);
// });

// delete
var sql = "DELETE FROM topic WHERE @rid=:rid";
db.query(sql,{params:{rid:"#23:0"}}).then(function(results){
  console.log(results);
});
