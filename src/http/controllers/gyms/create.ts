import { makeCreateGymsService } from "@/services/factories/make-create-gym-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(req: FastifyRequest, reply: FastifyReply) {
	const createBodySchema = z.object({
		title: z.string(),
		description: z.string().nullable(),
		phone: z.string().nullable(),
		latitude: z.number().refine((value) => {
			return Math.abs(value) <= 90
		}),
		longitude: z.number().refine((value) => {
			return Math.abs(value) <= 180
		}),
	})

	const { description, latitude, longitude, phone, title } = createBodySchema.parse(req.body)
		const createGym = makeCreateGymsService()

		await createGym.execute({ title, description, latitude, longitude, phone }) 


		return reply.status(201).send()
}