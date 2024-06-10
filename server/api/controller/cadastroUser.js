const uuidv4 = require('uuid/v4')
const axios = require('axios')
const https = require('https')

module.exports = (app) => {
  const cadastroUserDB = app.data.cadastroUser
  const controller = {}

  const sendResponse = ({ message, res, status, BD }) =>
    res.status(status).json({ message, BD })

  const sendResponseVazamento = ({ message, res, status, response }) =>
    res.status(status).json({ message, response })

  const { cadastroUser: cadastroUserMock } = cadastroUserDB

  const { data } = cadastroUserMock

  controller.list = (req, res) => {
    res.status(200).json(data)
  }

  controller.getUser = (req, res) => {
    const filtered = req.params
    const filterUser = data.find((user) => user.id == filtered.id)
    res.status(200).json(filterUser)
  }

  controller.save = (req, res) => {
    const user = {
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
    }
    cadastroUserMock.data.push(user)

    res.status(201).json(user)
  }

  controller.remove = (req, res) => {
    const { id } = req.params
    const foundCadastroUserIdex = cadastroUserMock.data.findIndex(
      (cadastroUser) => cadastroUser.id == id,
    )
    let notFound = foundCadastroUserIdex === -1
    let message = !notFound ? 'Usuario deletado' : 'Usuario não encontrado'
    let BD, status

    if (notFound) {
      BD = { cadastroUser: cadastroUserMock }
      status = 404
    } else {
      const deleteUser = {
        id: id,
        ...req.body,
      }
      cadastroUserMock.data.splice(foundCadastroUserIdex, 1, deleteUser)
      BD = { usuario: deleteUser }
      status = 200
    }
    sendResponse({ message, status, BD, res })
  }

  controller.update = (req, res) => {
    const { id } = req.params
    const foundCadastroUserIdex = cadastroUserMock.data.find((cadastroUser) => {
      cadastroUser.id == id
    })

    let notFound = foundCadastroUserIdex === -1
    let message = !notFound ? 'Usuario atualizado' : 'Usuario não encontrado'
    let BD, status
    if (notFound) {
      BD = { cadastroUser: cadastroUserMock }
      status = 404
    } else {
      const newCadastroUser = {
        id: id,
        ...req.body,
      }
      cadastroUserMock.data.splice(foundCadastroUserIdex, 1, newCadastroUser)
      BD = { usuario: newCadastroUser }
      status = 200
    }
    sendResponse({ message, status, BD, res })
  }

  controller.getLeak = (req, res) => {
    const { email } = req.params

    const apiKey = 'chave'
    const urlFicticia = `https://haveibeenpwned.com/api/v3/breachedaccount/${email}`
    let message = ''
    let status = null
    axios
      .get(urlFicticia, {
        headers: {
          'hibp-api-key': apiKey,
        },
      })
      .then((response) => {
        if (response.data.error) {
          message = 'Usuário não possui vazamentos'
          status = 404

          return sendResponse({ message, status, BD, res })
        }
        message = 'Usuário possui vazamentos'
        status = 200
        return sendResponseVazamento({
          message,
          status,
          response: response.data,
          res,
        })
      })
      .catch((error) => {
        if (error) {
          message = 'Usuário não possui vazamentos'
          status = 404

          return sendResponseVazamento({ message, status, res })
        }
      })
  }

  return controller
}
