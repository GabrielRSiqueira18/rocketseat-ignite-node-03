import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CreateGymService } from "../create-gym"

export function makeCreateGymsService() {
	const gymRepository = new PrismaGymsRepository()
	const useCase = new CreateGymService(gymRepository)

	return useCase
}