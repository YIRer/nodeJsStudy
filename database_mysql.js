var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'o2'
});

conn.connect();
//
// var sql = 'SELECT * FROM topic';
// conn.query(sql, function(err, rows, fields){
//     if(err){
//       console.log(err);
//     }else{
//       for(var i =0 ; i<rows.length;i++){
//         console.log(rows[i].author);
//       }
//     }
// });

// var sql ='INSERT INTO topic (title, description, author) VALUES(?, ?, ?)'
// var params = ['Supervisor', 'Wacther', 'YIRer'];
// conn.query(sql, params, function(err, rows, fields){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(rows.insertId);
//   }
// });

// var sql ='UPDATE topic SET title=?, description=? WHERE id=?';
// var params = ['nodejs', 'server side js', 2];
// conn.query(sql, params, function(err, rows, fields){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(rows);
//   }
// });

var sql ='DELETE FROM topic WHERE id=?';
var params = [4];
conn.query(sql, params, function(err, rows, fields){
  if(err){
    console.log(err);
  }else{
    console.log(rows);
  }
});

conn.end();

//
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
//
// connection.end();
