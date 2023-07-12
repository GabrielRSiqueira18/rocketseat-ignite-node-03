import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { UserArleadyExistError } from "@/services/errors/user-arleady-exist-error"
import { makeRegisterService } from "@/services/factories/make-register-services"

export async function register(req: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	})

	const { name, email, password } = registerBodySchema.parse(req.body)

	try {
		const regiserUseCase = makeRegisterService()

		await regiserUseCase.execute({name, email, password}) 
	} catch(err) {
		if(err instanceof UserArleadyExistError) {
			return reply.status(409).send({ message: err.message })
		}

		throw err
	}

	return reply.status(201).send()
}