import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { GymsRepository } from '../../repositories/gyms-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FetchUsersCheckInsHistoryService } from '../fetch-users-check-ins-history';

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: GymsRepository
let sut: FetchUsersCheckInsHistoryService

describe('Fetch Check In services', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository()
		gymsRepository = new InMemoryGymsRepository()
		sut = new FetchUsersCheckInsHistoryService(checkInsRepository)
	})
	

	it('should be able to fetch check-in history', async () => {
		await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01'
		})

		await checkInsRepository.create({
			gym_id: 'gym-02',
			user_id: 'user-01'
		})

		const { checkIns } = await sut.execute({
			userId: 'user-01',
			page: 1,
		})

		expect(checkIns).toHaveLength(2)
		expect(checkIns).toEqual([
			expect.objectContaining({ gym_id: 'gym-01' }),
			expect.objectContaining({ gym_id: 'gym-02' })
		])
	})

	it('should be able to fetch paginated user check-in user', async () => {
		
		for(let i = 1; i <= 22; i++) {
			await checkInsRepository.create({
				gym_id: `gym-${i}`,
				user_id: 'user-01'
			})
		}
	

		const { checkIns } = await sut.execute({
			userId: 'user-01',
			page: 2,
		})

		expect(checkIns).toHaveLength(2)
		expect(checkIns).toEqual([
			expect.objectContaining({ gym_id: 'gym-21' }),
			expect.objectContaining({ gym_id: 'gym-22' })
		])
	})	
})
