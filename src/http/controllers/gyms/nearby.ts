import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeFetchNearbyGyms } from "@/services/factories/make-nearby-gyms"

export async function nearby(req: FastifyRequest, reply: FastifyReply) {
	const nearbyGymsQuerySchema = z.object({
		latitude: z.coerce.number().refine((value) => {
			return Math.abs(value) <= 90
		}),
		longitude: z.coerce.number().refine((value) => {
			return Math.abs(value) <= 180
		}),
	})

	const { latitude, longitude} = nearbyGymsQuerySchema.parse(req.query)
		const fetchNearbyGymService = makeFetchNearbyGyms()

		const { gyms } = await fetchNearbyGymService.execute({ userLatitude: latitude, userLongitude: longitude }) 


		return reply.status(200).send({ gyms })
}