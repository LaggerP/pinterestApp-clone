const UserModel = require('../Models/user.js')
const LikesModel = require('../Models/likes.js')


const holaMundo = (req, res) => {
    res.json({ response: 'Hola mundo' })
}

const findAllUser = async (req, res) => {
    const user = await UserModel.findAll()
    res.json({ result: user })
}

const findUserById = async (req, res) => {
    const id = req.params.id
    const user = await UserModel.findOne({ where: { id } })
    res.json({ result: user })
}

const findLikeById = async (req, res) => {
    const id_user = req.params.id
    const like = await LikesModel.findAll({ where: { id_user } })
    res.json({ result: like })
}

const createLike = async (req, res) => {
    const { url, id_user } = req.body
    const newLike = await LikesModel.create({ url, id_user })
    console.log("Like creado", newLike.id)
    res.json(newLike)
}


const login = async (req, res) => {
    const { mail, password } = req.body
    let user = await UserModel.findOne({ where: { mail } })
    if (user !== null) {
        user = user.dataValues
        if (user.password === password) {
            res.status(200).json({ result: user })
        }
    } else {
        res.status(404).json({ error: 'not found' })
    }
    res.json({ response: 'login' })
}

const register = async (req, res) => {
    const body = req.body
    const { username, password, mail } = body
    const newUser = await UserModel.create({ username, password, mail })
    console.log("Usuario creado", newUser.id)
    return res.json(newUser)
}

module.exports = {
    holaMundo,
    findAllUser,
    findUserById,
    findLikeById,
    createLike,
    login,
    register,
}