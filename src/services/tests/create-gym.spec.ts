import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymService } from '../create-gym';

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create Gym services', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new CreateGymService(gymsRepository)
	})

	it('should be able to create gym', async () => {
		const { gym } = await sut.execute({
			title: 'Javascript Gym',
			description: null,
			phone: null,
			latitude: -27.0747279,
			longitude: -49.4889672,
		})

		expect(gym.id).toEqual(expect.any(String))
	})
})
