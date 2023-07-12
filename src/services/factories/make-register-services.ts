import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repositoriy"
import { RegisterService } from "../register"

export function makeRegisterService() {
	const usersRepository = new PrismaUsersRepository()
	const regiserService = new RegisterService(usersRepository)

	return regiserService
}