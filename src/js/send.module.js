const send = async data => {
	const response = await fetch('http://localhost:9090/send', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	return await response.json()
}

export { send }
