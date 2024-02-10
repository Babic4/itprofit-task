const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT ?? 9090

// function start server
const start = async () => {
	app.get('/api/ping', (request, response) => {
		response.status(200).json({
			status: 'success',
			message: 'Server is ready',
		})
	})

	app.post('/send', (request, response) => {
		let res = validate(request.body)
		response.status(200).send(res)
	})

	app.post('/api/registration', (request, response) => {
		if (Math.floor(Math.random() * 2) + 1 === 1) {
			response.status(200).send()
		} else {
			response.status(400).send()
		}
	})

	app.listen(PORT, () => {
		console.log(`[OK] Server is running on localhost:${PORT}`)
	})
}

// validate request body
const validate = data => {
	const regex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	let fields = {}
	if (data.name === '') fields['name'] = 'Value is empty'
	if (data.email === '') fields['email'] = 'Value is empty'
	else if (!regex.test(data.email)) fields['email'] = 'Value is not valid'
	if (data.phone === '') fields['phone'] = 'Value is empty'
	if (data.message === '') fields['message'] = 'Value is empty'

	if (Object.keys(fields).length !== 0) {
		resData = {
			status: 'error',
			fields: {
				...fields,
			},
		}
	} else {
		resData = {
			status: 'success',
			msg: 'Successfully sent!',
		}
	}
	return resData
}

// start server
start()
