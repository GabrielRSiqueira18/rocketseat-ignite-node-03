import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileServiceRequest {
	usedId: string
}

interface GetUserProfileServiceResponse {
	user: User
}

export class GetUserProfileService {
	constructor(
		private usersRepository: UsersRepository
	) {}

	async execute({ usedId }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
		const user = await this.usersRepository.findById(usedId)

		if(!user) {
			throw new ResourceNotFoundError()
		}

		return { user }
	}
}