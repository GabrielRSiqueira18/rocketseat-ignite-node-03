import { Prisma, checkIn } from "@prisma/client";

export interface CheckInsRepository {
	findById(id: string): Promise<checkIn | null>
	create(data: Prisma.checkInUncheckedCreateInput): Promise<checkIn>
	findManyByUserId(userId: string, page: number): Promise<checkIn[]>
	countByUserId(userId: string): Promise<number>
	findByUserIdOnDate(userId: string, date: Date): Promise<checkIn | null>
	save(checkIn: checkIn): Promise<checkIn>
}