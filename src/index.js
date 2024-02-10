import IMask from 'imask'
import { send } from './js/send.module'
import { validate } from './js/validation.module'
import './main.scss'

// form
const form = document.querySelector('#contact-form')
// inputs form
const username = document.querySelector('#name')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const message = document.querySelector('#message')
// mask phone
const maskOptions = {
	mask: '+{375}(00)000-00-00',
}
const mask = IMask(phone, maskOptions)
// response message
const resMessage = document.querySelector('#response-message')
// popup
const btnInfo = document.querySelector('#btn-info')
const popup = document.querySelector('#popup')

// submit form
form.addEventListener('submit', function (e) {
	e.preventDefault()
	if (validate(username, email, phone, message)) {
		let data = {
			name: username.value.trim(),
			email: email.value.trim(),
			phone: phone.value.trim(),
			message: message.value.trim(),
		}
		send(data).then(response => {
			if (response.status === 'success') {
				resMessage.classList.add('success')
				resMessage.innerHTML = response.msg
				resetForm()
			} else if (response.status === 'error') {
				resMessage.classList.add('error')
				for (var key in response.fields) {
					resMessage.innerHTML += `${key}: ${response.fields[key]}; `
				}
			}
		})
	} else console.log('NOT SEND')
})

// open and close popup
btnInfo.addEventListener('click', e => {
	e.preventDefault()
	popup.classList.toggle('show')
})

popup.addEventListener('click', e => {
	e.preventDefault()
	popup.classList.toggle('show')
})

// reset form
const resetForm = () => {
	username.value = ''
	email.value = ''
	phone.value = ''
	message.value = ''
}
