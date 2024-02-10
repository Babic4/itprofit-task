// validate form
const validate = (username, email, phone, message) => {
	let isUsernameValid = checkUsername(username),
		isEmailValid = checkEmail(email),
		isPhoneValid = checkPhone(phone),
		isMessageValid = checkMessage(message)

	return isUsernameValid && isEmailValid && isPhoneValid && isMessageValid
}

// required field
const isRequired = value => (value === '' ? false : true)

// regex email value
const isEmailValid = email => {
	const regex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return regex.test(email)
}

// check input name
const checkUsername = name => {
	if (!isRequired(name.value.trim())) {
		showError(name, 'Field "Name" required')
	} else {
		showSuccess(name)
		return true
	}
	return false
}

// check input email
const checkEmail = email => {
	if (!isRequired(email.value.trim())) {
		showError(email, 'Field "Email" required')
	} else if (!isEmailValid(email.value.trim())) {
		showError(email, 'Email is not valid.')
	} else {
		showSuccess(email)
		return true
	}
	return false
}

// check input phone
const checkPhone = phone => {
	if (!isRequired(phone.value.trim())) {
		showError(phone, 'Field "Phone" required')
	} else {
		showSuccess(phone)
		return true
	}
	return false
}

// check input message
const checkMessage = message => {
	if (!isRequired(message.value.trim())) {
		showError(message, 'Field "Message" required')
	} else {
		showSuccess(message)
		return true
	}
	return false
}

// show error
const showError = (input, message) => {
	const formField = input.parentElement
	formField.classList.add('error')

	const error = formField.querySelector('.error-message')
	error.textContent = message
}

// show success
const showSuccess = input => {
	const formField = input.parentElement
	formField.classList.remove('error')

	const error = formField.querySelector('.error-message')
	error.textContent = ''
}

export { validate }
