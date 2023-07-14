import { makeCheckInService } from "@/services/factories/make-check-in-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(req: FastifyRequest, reply: FastifyReply) {
	const createCheckInParamsSchema = z.object({
		gymId: z.string().uuid()
	})

	const createCheckInBodySchema = z.object({
		latitude: z.number().refine((value) => {
			return Math.abs(value) <= 90
		}),
		longitude: z.number().refine((value) => {
			return Math.abs(value) <= 180
		}),
	})

	const { latitude, longitude } = createCheckInBodySchema.parse(req.body)
	const { gymId } = createCheckInParamsSchema.parse(req.params)

		const checkInService = makeCheckInService()

		await checkInService.execute({ gymId, userLatitude: latitude, userLongitude: longitude, userId: req.user.sub }) 


		return reply.status(201).send()
}