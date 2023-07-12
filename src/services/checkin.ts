import { checkIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordanates";
import { maxDistanceError } from "./errors/max-distance-error";
import { maxNumberCheckInsError } from "./errors/max-number-of-check-ins-error";

interface CheckInServiceRequest {
	userId: string
	gymId: string
	userLatitude: number,
	userLongitude: number
}

interface CheckInServiceResponse {
	checkIn: checkIn
}

export class CheckInService {
	constructor(
		private checkInRepository: CheckInsRepository,
		private gymsRepository: GymsRepository
	) {}

	async execute({ gymId, userId, userLatitude, userLongitude }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
		const gym = await this.gymsRepository.findById(gymId)

		if(!gym) {
			throw new ResourceNotFoundError()
		}

		const distance = getDistanceBetweenCoordinates({ latitude: userLatitude, longitude: userLongitude }, { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() })

		const MAX_DISTANCE_IN_KM = 0.1

		if(distance > MAX_DISTANCE_IN_KM) {
			throw new maxDistanceError()
		}

		const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(userId, new Date())

		if(checkInOnSameDay) {
			throw new maxNumberCheckInsError()
		}

		const checkIn = await this.checkInRepository.create({
			gym_id: gymId,
			user_id: userId
		})

		return { checkIn }
	}
}