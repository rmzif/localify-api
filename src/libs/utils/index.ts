import { Request, Response } from 'express'
import logger from '@/libs/utils/logger'

export const processError = (req: Request, res: Response, err: unknown) => {
  // @ts-ignore
  logger.warn(`An error happened: ${err?.message}`)

  // @ts-ignore
  return res.status(400).send(err?.message)
}
