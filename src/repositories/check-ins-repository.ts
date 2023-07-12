import { Prisma, checkIn } from "@prisma/client";

export interface CheckInsRepository {
	create(data: Prisma.checkInUncheckedCreateInput): Promise<checkIn>
}