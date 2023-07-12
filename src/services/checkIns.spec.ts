import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterService } from './register'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInService } from './checkin';

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInService

beforeEach(() => {
	checkInsRepository = new InMemoryCheckInsRepository()
	sut = new CheckInService(checkInsRepository)
})


describe('Register services', () => {
	it('should be able to check in', async () => {
		const { checkIn } = await sut.execute({
			gymId: '01',
			userId: '01',
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})
	
	
})
