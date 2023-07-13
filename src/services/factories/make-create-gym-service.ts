import { SearchGymService } from "../search-gym"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeSearchGymsService() {
	const gymRepository = new PrismaGymsRepository()
	const useCase = new SearchGymService(gymRepository)

	return useCase
}