import type { FastifyInstance } from 'fastify'
import { healthRoutes } from './health'
import { teamsRoutes } from './teams'


export async function registerRoutes(fastify: FastifyInstance) {
  await healthRoutes(fastify)
  await teamsRoutes(fastify)
}
