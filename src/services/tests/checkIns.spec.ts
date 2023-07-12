import { expect, it, describe, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInService } from '../checkin';
import { GymsRepository } from '../../repositories/gyms-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { maxDistanceError } from '../errors/max-distance-error';
import { maxNumberCheckInsError } from '../errors/max-number-of-check-ins-error';

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: GymsRepository
let sut: CheckInService

describe('Register services', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository()
		gymsRepository = new InMemoryGymsRepository()
		sut = new CheckInService(checkInsRepository, gymsRepository)
	
		await gymsRepository.create({
			id: '01',
			title: 'Javascript Gym',
			description: '',
			latitude: -27.2092052,
			longitude: -49.6401091,
			phone: '',
		})
	
		vi.useFakeTimers()
	})
	
	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be able to check in', async () => {
		const { checkIn } = await sut.execute({
			gymId: '01',
			userId: '01',
			userLatitude: -27.2092052,
			userLongitude: -49.6401091,
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

		await sut.execute({
			gymId: '01',
			userId: '01',
			userLatitude: -27.2092052,
			userLongitude: -49.6401091,
		})

		await expect(() => sut.execute({
			gymId: '01',
			userId: '01',
			userLatitude: -27.2092052,
			userLongitude: -49.6401091,
		})).rejects.toBeInstanceOf(maxNumberCheckInsError)
	})

	it('should be able to check in twice in the differents day', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

		await sut.execute({
			gymId: '01',
			userId: '01',
			userLatitude: -27.2092052,
			userLongitude: -49.6401091,
		})

		vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

		const { checkIn } = await sut.execute({
			gymId: '01',
			userId: '01',
			userLatitude: -27.2092052,
			userLongitude: -49.6401091,
		})
		
		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should not be able to check in to distant gym', async () => {
		gymsRepository.items.push({
			id: '02',
			title: 'Javascript Gym',
			description: '',
			latitude: new Decimal(-27.0747279),
			longitude: new Decimal(-49.4889672),
			phone: '',
	
		})

		await expect(() => sut.execute({
			gymId: '02',
			userId: '01',
			userLatitude: -27.2092052,
			userLongitude: -49.6401091,
		})).rejects.toBeInstanceOf(maxDistanceError)
	})
	
	
})
