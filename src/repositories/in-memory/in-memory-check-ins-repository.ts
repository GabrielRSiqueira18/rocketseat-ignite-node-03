import { Prisma, User, checkIn } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { GetResult } from "@prisma/client/runtime/library";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository {
	constructor() {}
	
	public items: checkIn[] = []

	async create(data: Prisma.checkInUncheckedCreateInput) {
		const checkIn = {
			id: randomUUID(),
			user_id: data.user_id,
			gym_id: data.gym_id,
			validated_at: data.validated_at ? new Date() : null,
			created_at: new Date()
		}

		this.items.push(checkIn)

		return checkIn
	}

}