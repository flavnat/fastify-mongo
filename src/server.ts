import Fastify from 'fastify'
import cors from '@fastify/cors'
import { registerRoutes } from './routes'
import { env } from './config/env'
import { envToLogger } from './config/logger'
import db from './plugins/db'


export async function createServer() {

    const fastify = Fastify({
        logger: envToLogger[env.NODE_ENV] ?? true,
        requestIdHeader: 'x-request-id',
        requestIdLogLabel: 'requestId',
        disableRequestLogging: false,
        genReqId: () => crypto.randomUUID(),
    })


    await fastify.register(cors, {
        origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(','),
        credentials: true,
    })



    await fastify.register(db)


    await registerRoutes(fastify)

    return fastify
}
