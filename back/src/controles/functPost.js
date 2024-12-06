
const Post = require('../models/posteos')

const AgregarPostDB = async (req, res) => {

    const {titulo, url, descripcion} = req.body
    try {
        const respuesta = await Post.AgregarPost(titulo, url, descripcion)
        res.status(200).json({
            msg: "Post Agregado con Exito!",
            data: respuesta
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
  }
};

const ListarPostDB = async (req, res) => {
    try {
        const posts  = await Post.ListarPost()
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

const likePost = async (req, res) => {
    const { id } = req.params
    try {
        const respuesta = await Post.likePost(id)
        res.status(200).json(respuesta)
    } catch (err) {
        res.status(500).json({ error: err.message });
  }
}


const eliminarPost = async (req, res) => {
    const { id } = req.params;
    try {
        const respuesta = await Post.eliminarPost(id);
        res.status(200).json(respuesta)
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

module.exports = {
    AgregarPostDB, ListarPostDB, likePost, eliminarPost
}