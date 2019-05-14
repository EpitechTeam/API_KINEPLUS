import express from 'express'
import morgan from 'morgan'
import path from 'path'
import bodyParser from 'body-parser'
import compression from 'compression'
import mongoose from 'mongoose'
import user from './routes/user'
import login from './routes/login'


let server, serverHttp
let port = process.env.PORT || 8080
let app = express()

//Connect to DB
mongoose.connect("mongodb://" + "fluorz:lecherbonnier1@ds155916.mlab.com:55916/api-kineplus" , { useNewUrlParser: true })

server = app.listen(port, () => {console.log( "Express server listening on port " + port)})

app.use(compression())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(morgan("tiny"))

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization')
	next()
})
//
app.use('/user', user)
app.use('/authentification', login)

process.on('uncaughtException', err => {
	console.log(err)
})

app.get('/', (req, res) => {
	res.json("API Kineplus")
})

function stop() {
    server.close()
}
