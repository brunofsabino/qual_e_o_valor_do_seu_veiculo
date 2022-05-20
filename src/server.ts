import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import mustache from 'mustache-express'
import path from 'path'

import router from './routes/router'

dotenv.config()

const server = express()


server.engine('mustache', mustache())
server.set('view engine', 'mustache')
server.set('views', path.join(__dirname, 'views'))

server.use(express.urlencoded({ extended: true }))

server.use(express.static(path.join(__dirname, '../public')))

server.use(router)

server.listen(process.env.PORT)
