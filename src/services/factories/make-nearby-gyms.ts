import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { FetchNearbyService } from "../fetch-nearby-gyms"

export function makeFetchNearbyGyms() {
	const gymRepository = new PrismaGymsRepository()
	const useCase = new FetchNearbyService(gymRepository)

	return useCase
}