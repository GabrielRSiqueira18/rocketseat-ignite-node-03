import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { SearchGymRequest } from '../search-gym'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymRequest

describe('Search Gyms services', () => {
	beforeEach(async () => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new SearchGymRequest(gymsRepository)
	})
	

	it('should be able to search for gyms', async () => {
		await gymsRepository.create({
			title: 'Javascript-01',
			description: null,
			phone: null,
			latitude: -27.0747279,
			longitude: -49.4889672,
		})

		await gymsRepository.create({
			title: 'Typescript-02',
			description: null,
			phone: null,
			latitude: -27.0747279,
			longitude: -49.4889672,
		})

		const { gyms } = await sut.execute({
			query: 'Javascript',
			page: 1
		})

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'Javascript-01', }),
		])
	})

	it('should be able to fetch paginated gym search', async () => {
		
		for(let i = 1; i <= 22; i++) {
			await gymsRepository.create({
				title: `Javascript-${i}`,
				description: null,
				phone: null,
				latitude: -27.0747279,
				longitude: -49.4889672,
			})
		}
	

		const { gyms } = await sut.execute({
			query: 'Javascript',
			page: 2,
		})

		expect(gyms).toHaveLength(2)
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'Javascript-21' }),
			expect.objectContaining({ title: 'Javascript-22' })
		])
	})	
})
