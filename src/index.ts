import { env } from './config/env'
import { createServer } from './server'

async function start() {
  try {
    const app = await createServer()

    await app.listen({
      port: env.PORT,
      host: '0.0.0.0',
    })

    app.log.info(`Server running on http://localhost:${env.PORT}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
