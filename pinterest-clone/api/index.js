const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const api = require('./routes/index')
const app = express()
const connection = require('./sql')


connection
    .authenticate()
    .then(() => {
        console.log('Conexion exitosa.')
        app.use(cors())
        //el bodyParser nos parsea el cuepo del post
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())

        app.use('/api', api)

        app.listen(5000)
    })
    .catch(err => console.error('No hay conexion:', err));

    connection.sync().then(e=>console.log("Sync!!"))

