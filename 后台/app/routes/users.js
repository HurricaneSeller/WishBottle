var express = require('express');
var router = express.Router();

var sql = require('mysql');
var dbConfig = require('../db/DBConfig');
var pool = sql.createPool( dbConfig.mysql );

const SQL = require('../db/QuerySQL');
const s = require('../db/store');

var responseJSON = (response, result, failData, successData) => {
  if(typeof result == 'undefined'){
    response.json({
      code: s["fail"],
      data: failData
    });
  }else {
    response.json({
      code: s["success"],
      data: successData
    });
  }
};


// 注册
router.post('/reg', (req, res) => {
  let value = [req.body.name, req.body.email, req.body.password];
  pool.getConnection((err, connection) => {
    connection.query(SQL["INSERT_USER"], value, (err, result) => {
      let failData = {
          msg: s["wrong"]
      };
      let successData = {
        msg: s["register_success"],
        user_id: result.insertId,
    };
      responseJSON(res, result, failData, successData);
    })
    connection.release();
  })
})

// 登陆
router.post('/login' , (req, res) => {
  pool.getConnection((err, connection) => {  
    let input_id = [req.body.user_id], input_password = req.body.password;
    connection.query(SQL["GET_USER_BY_ID"], input_id, (err, result) => {
      let faliData = {
        msg: s["wrong"]
      }
      let successData_right = {
        msg: s["right_password"],
        data: JSON.parse(JSON.stringify(result).slice(1, -1))
      }
      let successData_wrong = {
        msg: s["wrong_password"],
      }
      let password = JSON.parse(JSON.stringify(result).slice(1, -1)).password;
      password == input_password ? responseJSON(res,result, faliData, successData_right)
      : responseJSON(res,result, faliData, successData_wrong);
    })
    connection.release();
  })
});

module.exports = router;
