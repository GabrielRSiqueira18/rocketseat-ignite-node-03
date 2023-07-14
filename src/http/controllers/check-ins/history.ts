import { makeFetchUserCheckInsHistory } from "@/services/factories/make-fetch-user-check-ins-history-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function history(req: FastifyRequest, reply: FastifyReply) {
	const checkInHistoryQuerySchema = z.object({
		page: z.coerce.number().min(1).default(1)
	})

	const { page } = checkInHistoryQuerySchema.parse(req.query)
		const fetchUsersCheckInServices = makeFetchUserCheckInsHistory()

		const { checkIns } = await fetchUsersCheckInServices.execute({ page, userId: req.user.sub }) 


		return reply.status(200).send({ checkIns })
}