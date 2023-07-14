import { makeSearchGymsService } from "@/services/factories/make-search-gym-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function search(req: FastifyRequest, reply: FastifyReply) {
	const searchGymsQuerySchema = z.object({
		q: z.string(),
		page: z.coerce.number().min(1).default(1)
	})

	const { page, q } = searchGymsQuerySchema.parse(req.query)
		const searchGymService = makeSearchGymsService()

		const { gyms } = await searchGymService.execute({ query: q, page }) 


		return reply.status(200).send({ gyms })
}