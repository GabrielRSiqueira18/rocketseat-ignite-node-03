import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
	const user = await prisma.user.create({
		data: {
			name: 'Teste',
			email: 'teste@gmail.com',
			password_hash: await hash('123456', 6),
			
		}
	})
	
	const authResponse = await request(app.server).post('/users/sessions').send({
		email: 'teste@gmail.com',
		password: '123456',
	})

	const { token } = authResponse.body

	return { token }
}