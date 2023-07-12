import { UserArleadyExistError } from "@/services/errors/user-arleady-exist-error"
import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import { hash } from "bcryptjs"

interface RegiserServiceRequest {
	name: string
	email: string
	password: string
}

interface RegiserServiceResponse {
	user: User
}

export class RegisterService {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ email, name, password }: RegiserServiceRequest): Promise<RegiserServiceResponse> {
		const password_hash = await hash(password, 6)
	
		const userWithSameEmail = await this.usersRepository.findByEmail(email)
	
		if(userWithSameEmail) {
			throw new UserArleadyExistError()
		}
	
		const user = await this.usersRepository.create({
			email,
			name,
			password_hash,
		})

		return { user }
	}
}

