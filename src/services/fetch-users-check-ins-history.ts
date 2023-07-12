import { checkIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUsersCheckInsHistoryServiceRequest {
	userId: string
	page: number
}

interface FetchUsersCheckInsHistoryServiceResponse {
	checkIns: checkIn[]
}

export class FetchUsersCheckInsHistoryService {
	constructor(
		private checkInRepository: CheckInsRepository,
	) {}

	async execute({ userId, page }: FetchUsersCheckInsHistoryServiceRequest): Promise<FetchUsersCheckInsHistoryServiceResponse> {
		const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

		return { checkIns }
	}
}