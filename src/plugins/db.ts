import fp from 'fastify-plugin'
import mongoose from 'mongoose'
import type { FastifyInstance } from 'fastify'
import { env } from '../config/env'

async function db(app: FastifyInstance) {
    try {
        mongoose.set('strictQuery', true)

        await mongoose.connect(env.DATABASE_URL, {
            serverSelectionTimeoutMS: 5000,
        })

        app.log.info('✓ MongoDB connected')

        app.addHook('onClose', async () => {
            await mongoose.disconnect()
        })
    } catch (err) {
        app.log.error(err, '✗ Mongo connection failed')
        throw err
    }
}

export default fp(db)
