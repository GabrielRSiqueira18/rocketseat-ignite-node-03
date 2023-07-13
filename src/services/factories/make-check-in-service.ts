import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { CheckInService } from "../checkin"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeCheckInService() {
	const checkInRepository = new PrismaCheckInsRepository()
	const gymRepository = new PrismaGymsRepository()
	const useCase = new CheckInService(checkInRepository, gymRepository)

	return useCase
}