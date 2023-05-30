import Mongoose from 'mongoose'
import dotenv from 'dotenv'
import logger from '../utils/logger'

dotenv.config()

Mongoose.set('strictQuery', false)

logger.info(`Attempting to connect to database..`)

if (!process.env.MONGO_URI) {
  logger.error(`Missing MONGO_URI from ENV`)
  process.exit(1)
}

Mongoose.connect(process.env.MONGO_URI).catch((e) => {
  logger.info(`Unable to connect to database => ${e.message}`)
})

Mongoose.connection.on('error', (err) => {
  logger.error(`Database error => ${err.message}`)
})

Mongoose.connection.on('open', () => {
  logger.info('Database open')
})

Mongoose.connection.on('connected', () => {
  logger.info('Database connected')
})

Mongoose.connection.on('reconnected', () => {
  logger.info('Database reconnected')
})

Mongoose.connection.on('disconnecting', () => {
  logger.error('Database disconnecting')
})

Mongoose.connection.on('disconnected', () => {
  logger.error('Database disconnected')
})
