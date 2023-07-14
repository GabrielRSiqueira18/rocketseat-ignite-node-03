import { CreateGymService } from "../create-gym"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeCreateGymsService() {
	const gymRepository = new PrismaGymsRepository()
	const useCase = new CreateGymService(gymRepository)

	return useCase
}