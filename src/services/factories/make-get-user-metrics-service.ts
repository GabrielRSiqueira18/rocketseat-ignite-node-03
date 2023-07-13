import { GetUserMetricsService } from "../get-user-metrics"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeGetUserMetricsService() {
	const checkInRepository = new PrismaCheckInsRepository()
	const useCase = new GetUserMetricsService(checkInRepository)

	return useCase
}