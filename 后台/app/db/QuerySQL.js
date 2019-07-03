// 储存所有sql查表语句

const SQL = { 
    // 添加一个用户
    "INSERT_USER": `INSERT INTO user(name,email,password)
                    VALUES(?,?,?)`,
    // 按user_id查找用户
    "GET_USER_BY_ID": "SELECT * FROM user WHERE user_id=?",
    "GET_ALL_USER": "SELECT * FROM user",
    "GET_ALL_WISH": "SELECT * FROM wish",

    "GET_WISHES_BY_USER_ID": "SELECT * FROM wish WHERE user_id=?",
    "GET_ALL_WISHES": "SELECT * FROM wish",
    "INSERT_WISH": `INSERT INTO wish(user_id,name,email,date,favor_num,picture,first_picture,content)
                    VALUES(?,?,?,?,?,?,?,?)`
}
module.exports = SQL;

