const signupFormHandler = async (e) => {
	e.preventDefault();

	const username = document.querySelector('.username').value.trim();
	const email = document.querySelector('.email').value.trim();
	const password = document.querySelector('.thePassword').value.trim();

	if (username && email && password) {
		const response = await fetch('/api/users/register', {
			method: 'POST',
			body: JSON.stringify({ username, email, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/');
		} else {
			alert('Failed to sign up');
		}
	}
};



const signUp = document
	.querySelector('.signup-form')
	.addEventListener('submit', signupFormHandler);

function toLogin () {
	document.location.replace('/login')
}

const memberLog = document.querySelector('.toLogin')
memberLog.addEventListener('click', toLogin)