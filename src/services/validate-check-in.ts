import { checkIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { lateCheckInValidationError } from "./errors/late-check-in-validations-error";

interface ValidateCheckInServiceRequest {
	userId: string
	checkInId: string
}

interface ValidateCheckInServiceResponse {
	checkIn: checkIn
}

export class ValidateCheckInService {
	constructor(
		private checkInRepository: CheckInsRepository,
	) {}

	async execute({ userId, checkInId }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {
		const checkIn = await this.checkInRepository.findById(checkInId)

		if(!checkIn) {
			throw new ResourceNotFoundError()
		}

		const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
			checkIn.created_at, 
			'minutes'
		)

		if(distanceInMinutesFromCheckInCreation > 20) {
			throw new lateCheckInValidationError()
		}

		checkIn.validated_at = new Date()

		await this.checkInRepository.save(checkIn)

		return { checkIn }
	}
}