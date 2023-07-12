import { Gym } from "@prisma/client"
import { GymsRepository } from '../repositories/gyms-repository';

interface GymServiceRequest {
	title: string
	description: string | null
	phone: string | null
	latitude: number
	longitude: number
}

interface GymServiceResponse {
	gym: Gym
}

export class GymService {
	constructor(private gymsRepository: GymsRepository) {}

	async execute({ description, latitude, longitude, phone, title }: GymServiceRequest): Promise<GymServiceResponse> {
		const gym = await this.gymsRepository.create({
			description, 
			latitude,
			longitude, 
			phone, 
			title,
		})

		return { gym }
	}
}

