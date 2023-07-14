import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import request from 'supertest'
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";

describe('Create Gyms (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to get create gym', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const response = await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
			title: 'Javascript',
			description: 'Description',
			phone: '11910518642',
			latitude: -27.0747279,
			longitude: -49.4889672,
		})

		expect(response.statusCode).toEqual(201)
	})
}) 