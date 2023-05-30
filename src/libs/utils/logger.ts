import pino from "pino";
import pretty from "pino-pretty";
import dotenv from "dotenv";
dotenv.config()
const stream = pretty({
    colorize: true,
})

const logger = process.env.ENVIRONMENT === 'development' ? pino(stream) : pino()

global.logger = logger
export default logger