import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterService } from '../register'
import { compare } from 'bcryptjs';
import { UserArleadyExistError } from '@/services/errors/user-arleady-exist-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register services', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new RegisterService(usersRepository)
	})
	

	it('should be able to register', async () => {
		const { user } = await sut.execute({
			name: 'Teste',
			email: 'teste10@gmail.com',
			password: '123456',
		})

		expect(user.id).toEqual(expect.any(String))
	})
	
	it('should hash user password upon registration', async () => {
		const { user } = await sut.execute({
			name: 'Teste',
			email: 'teste10@gmail.com',
			password: '123456',
		})

		const isPasswordHashed = await compare(
			'123456',
			user.password_hash
		)

		expect(isPasswordHashed).toBe(true)
	})

	it('should not be able to register with same email twice', async () => {
		const email = 'teste@example.com'

		await sut.execute({
			name: 'teste',
			email,
			password: '123456'
		})

		await expect(() => 
			sut.execute({
				name: 'teste',
				email,
				password: '123456'
		})).rejects.toBeInstanceOf(UserArleadyExistError)
	})
})
