import { Gym } from "@prisma/client"
import { GymsRepository } from '../repositories/gyms-repository';

interface SearchGymRequestRequest {
	query: string
	page: number
}

interface SearchGymRequestResponse {
	gyms: Gym[]
}

export class SearchGymService {
	constructor(private gymsRepository: GymsRepository) {}

	async execute({ page, query }: SearchGymRequestRequest): Promise<SearchGymRequestResponse> {
		const gyms = await this.gymsRepository.searchMany(query, page)

		return { gyms}
	}
}

