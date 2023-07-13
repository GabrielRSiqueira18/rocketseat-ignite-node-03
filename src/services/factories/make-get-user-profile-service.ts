import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repositoriy"
import { GetUserProfileService } from "../get-user-profile"

export function makeGetUserProfileService() {
	const usersRepository = new PrismaUsersRepository()
	const useCase = new GetUserProfileService(usersRepository)

	return useCase
}