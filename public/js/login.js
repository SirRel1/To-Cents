const loginHandler = async (e) => {
	e.preventDefault();

	let email = document.querySelector('.loginEmail').value.trim();
	let password = document.querySelector('.loginPassword').value.trim();

	if (email && password) {
		const response = await fetch('api/users/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/');
		} else {
			alert('Incorrect Email or Password');
		}
	}
};


document
.getElementById('login-form')
.addEventListener('submit', loginHandler);


