import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repositoriy"
import { AuthenticateService } from "../authenticate"

export function makeAuthenticateService() {
	const usersRepository = new PrismaUsersRepository()
	const authenticateService = new AuthenticateService(usersRepository)

	return authenticateService
}