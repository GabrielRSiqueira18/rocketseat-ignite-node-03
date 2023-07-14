import { makeValidateCheckInService } from "@/services/factories/make-validate-check-in-service"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function validate(req: FastifyRequest, reply: FastifyReply) {
	const validateCheckInParamsSchema = z.object({
		checkInId: z.string().uuid()
	})

	const { checkInId } = validateCheckInParamsSchema.parse(req.params)

		const validaCheckInService = makeValidateCheckInService()

		await validaCheckInService.execute({ checkInId, userId: req.user.sub }) 

		return reply.status(204).send()
}