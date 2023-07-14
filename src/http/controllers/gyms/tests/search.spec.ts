import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import request from 'supertest'
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";

describe('Search Gyms (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to search gyms by title', async () => {
		const { token } = await createAndAuthenticateUser(app)

		await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
			title: 'Javascript',
			description: 'Description',
			phone: '11910518642',
			latitude: -27.0747279,
			longitude: -49.4889672,
		})
		
		await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
			title: 'Typescript',
			description: 'Description',
			phone: '11910518642',
			latitude: -27.0747279,
			longitude: -49.4889672,
		})

		const response = await request(app.server).get('/gyms/search').query({
			q: 'Javascript'
		}).set('Authorization', `Bearer ${token}`).send()


		expect(response.statusCode).toEqual(200)
		expect(response.body.gyms).toHaveLength(1)
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: 'Javascript'
			})
		])
	})
}) 