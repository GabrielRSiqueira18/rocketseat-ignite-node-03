import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs';
import { GetUserProfileService } from '../get-user-profile';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile services', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new GetUserProfileService(usersRepository)
	})

	it('should be able to get user profile', async () => {
		const createdUser = await usersRepository.create({
			name: 'teste',
			email: 'teste10@gmail.com',
			password_hash: await hash('123456', 6),
		})

		const { user } = await sut.execute({
			usedId: createdUser.id
		})

		expect(user.id).toEqual(expect.any(String))
		expect(user.name).toEqual('teste')
	})

	it('should not be able to get user profile with wrong id', async () => {
		await expect(() => sut.execute({
			usedId: 'not exist this user id'
		})).rejects.toBeInstanceOf(ResourceNotFoundError)
	})

})
