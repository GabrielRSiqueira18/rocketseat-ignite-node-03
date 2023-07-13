import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { FetchUsersCheckInsHistoryService } from "../fetch-users-check-ins-history"

export function makeFetchUserCheckInsHistory() {
	const checkInRepository = new PrismaCheckInsRepository()
	const useCase = new FetchUsersCheckInsHistoryService(checkInRepository)

	return useCase
}