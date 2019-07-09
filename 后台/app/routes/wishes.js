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


router.post('/user', (req, res) => {
    let input_id = [req.body.user_id];
    pool.getConnection((err, connection) => {
        connection.query(SQL["GET_WISHES_BY_USER_ID"], input_id, (err, result) => {
            let failData = {
                msg: s["wrong"]
            }
            let successData = {
                msg: s["finish"],
                data: result
            }
            responseJSON(res, result, failData, successData);
        })
        connection.release();
    })
});

router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(SQL["GET_ALL_WISHES"], (err, result) => {
            let failData = {
                msg: s["wrong"]
            }
            let successData = {
                msg: s["finish"],
                data: result
            }
            responseJSON(res, result, failData, successData);
        })
        connection.release();
    })
});


router.post('/', (req, res) => {
  let id = req.body.user_id, date = new Date().Format("yyyy-MM-dd HH:mm:ss"), content = req.body.content;
  pool.getConnection((err, connection) => {
    connection.query(SQL["GET_USER_BY_USER_ID"], id, (err, result) => {
      let user = JSON.parse(JSON.stringify(result).slice(1, -1));
      let value = [id, user.name, user.email, date, 0,'','',content];
      pool.getConnection((err, connection) => {
        connection.query(SQL["INSERT_WISH"], value, (err, result) => {
          let failData = {
              msg: s["wrong"]
          };
          let successData = {
            msg: s["finish"],
          };

          responseJSON(res, result, failData, successData);
        })
      })
    })
    connection.release();
  })
})
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

router.post('/favor', (req, res) => {
  let id = req.body.user_id, wish_id = req.body.wish_id;
  pool.getConnection((err, connection) => {
      connection.query(`SELECT * FROM user_wish WHERE user_id=` + id, (err, result) => {
         let favor = JSON.stringify(JSON.parse(JSON.stringify(result).slice(1, -1)).favor).slice(1, -1);
         let tmp = favor.split('@');
         if (tmp) {
           for (let i = 0; i < tmp.length; i ++) {
             if (tmp[i] == wish_id) {
               res.send({
                 code: 304,
                 data: {
                   msg: '点过赞了'
                 }
               })
             }
           }
         } 
         favor = JSON.stringify(favor + '@' + wish_id);

         connection.query(`UPDATE user_wish SET favor=` + favor + ` WHERE user_id=` + id, (err, result) => {
           res.send({
             code: 200, 
             data: {
               msg: '点赞成功'
             }
           });
         })
      })
      connection.release();
  })
});
module.exports = router;
