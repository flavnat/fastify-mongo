import z from 'zod'
import 'dotenv/config'

const rawEnv = z.object({
  NODE_ENV: z.enum(['development', 'production', 'staging']).default('development'),
  PORT: z.coerce.number().default(3000),

  DATABASE_URL_STAGING: z.string().optional(),
  DATABASE_URL_DEV: z.string().optional(),
  DATABASE_URL_PROD: z.string().optional(),

  CORS_ORIGIN: z.string().default('*'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
}).parse(process.env)

const DATABASE_URL = (() => {
  switch (rawEnv.NODE_ENV) {
    case 'production':
      return rawEnv.DATABASE_URL_PROD
    case 'staging':
      return rawEnv.DATABASE_URL_STAGING
    default:
      return rawEnv.DATABASE_URL_DEV
  }
})()

if (!DATABASE_URL) {
  throw new Error(`Missing database url for NODE_ENV=${rawEnv.NODE_ENV}`)
}

export const env = {
  ...rawEnv,
  DATABASE_URL,
}
