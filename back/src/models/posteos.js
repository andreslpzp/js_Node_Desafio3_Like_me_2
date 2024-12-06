
const {DB} = require('../config/db')


const AgregarPost = async(tit, img, des) => {

    const SqlQuery = "INSERT INTO posts VALUES(DEFAULT, $1, $2, $3)"
    const values = [tit, img, des]
    const {rowCount,rows}  = await DB.query(SqlQuery, values)
    return {
        rowCount, rows
    }
}

const ListarPost = async() => {

    const SqlQuery = "SELECT * FROM posts"
    const {rows} = await DB.query(SqlQuery)
    return rows;

}

const likePost = async (id) => {

      const SqlQuery = 'UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *'
      const values = [id]
      const { rows } = await DB.query(SqlQuery, values)
      return rows[0]
  }

const eliminarPost = async (id) => {

    const SqlQuery = 'DELETE FROM posts WHERE id = $1';
    const values = [id];
    const eli  =await DB.query(SqlQuery, values)
    return eli.rows[0]
  }

module.exports = {
    AgregarPost, ListarPost, likePost, eliminarPost
}