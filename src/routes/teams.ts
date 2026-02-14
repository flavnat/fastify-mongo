import type { FastifyInstance } from 'fastify'
import { TeamModel } from '../models/team.model'

export async function teamsRoutes(app: FastifyInstance) {

  app.get('/teams', async () => {
    const teams = await TeamModel.find().lean()
    return teams
  })


  app.post('/teams', async (request, reply) => {
    try {
      const teamData = request.body as any
      const team = new TeamModel(teamData)
      await team.save()

      return reply.code(201).send({
        status: 'success',
        message: 'Team created',
        data: team
      })
    } catch (error: any) {
      app.log.error(error)
      return reply.code(400).send({
        status: 'error',
        message: error.message
      })
    }
  })
}
