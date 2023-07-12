import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { UsersRepository } from "@/repositories/users-repository";
import { User, checkIn } from "@prisma/client";
import { compare } from "bcryptjs";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckInServiceRequest {
	userId: string
	gymId: string
}

interface CheckInServiceResponse {
	checkIn: checkIn
}

export class CheckInService {
	constructor(
		private checkInRepository: CheckInsRepository
	) {}

	async execute({ gymId, userId }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
		const checkIn = await this.checkInRepository.create({
			gym_id: gymId,
			user_id: userId
		})

		return { checkIn }
	}
}