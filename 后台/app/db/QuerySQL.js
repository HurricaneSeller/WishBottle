// 储存所有sql查表语句

const SQL = { 
    // 添加一个用户
    "INSERT_USER": `INSERT INTO user(name,email,password)
                    VALUES(?,?,?)`,
    "GET_USER_BY_USER_ID": `SELECT * FROM user WHERE user_id=?`,
    // 按email查找用户
    "GET_USER_BY_EMAIL": "SELECT * FROM user WHERE eamil=?",
    "GET_ALL_USER": "SELECT * FROM user",
    "GET_ALL_WISH": "SELECT * FROM wish",

    "GET_WISHES_BY_USER_ID": "SELECT * FROM wish WHERE user_id=?",
    "GET_ALL_WISHES": "SELECT * FROM wish",
    "INSERT_WISH": `INSERT INTO wish(user_id,name,email,date,favor_num,picture,first_picture,content)
                    VALUES(?,?,?,?,?,?,?,?)`,

    // "UPDATE_PASSWORD_AND_NAME": `UPDATE user SET password=pass, name=name WHERE user_id=1`
}
module.exports = SQL;

