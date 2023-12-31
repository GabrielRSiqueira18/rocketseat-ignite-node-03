import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs';
import { AuthenticateService } from '../authenticate';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate services', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new AuthenticateService(usersRepository)
	})
	

	it('should be able to authenticate', async () => {
		await usersRepository.create({
			name: 'teste',
			email: 'teste10@gmail.com',
			password_hash: await hash('123456', 6),
		})

		const { user } = await sut.execute({
			email: 'teste10@gmail.com',
			password: '123456',
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should not be able to authenticate with wrong email', async () => {
		await expect(() => sut.execute({
			email: 'teste10@gmail.com',
			password: '123456',
		})).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able to authenticate with wrong password', async () => {
		await usersRepository.create({
			name: 'teste',
			email: 'teste10@gmail.com',
			password_hash: await hash('1234567', 6),
		})

		await expect(() => sut.execute({
			email: 'teste10@gmail.com',
			password: '123456',
		})).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
