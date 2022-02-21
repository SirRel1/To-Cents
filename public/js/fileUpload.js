// const multer = require('multer')

const res = require("express/lib/response");

// let storage = multer.diskStorage({

//   destination: function (req, file, cb) {

//     cb(null, '/uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname )
//   }
// });

// const theFilter = (req, file, cb) => {
// 	file.mimetype === 'image/jpeg' || file.mimetype === 'image.png' ?
// 	cb(null, true) : cb(null, false);
// }

// let upload = multer({ storage, limits: {
// 	fileSize: 1024* 1024 * 5
// } ,
// 	theFilter
// });

// module.exports = {
//   storage,
//   upload,
//   theFilter
// }
// const picUsers = require('../../models/picUsers.js')

const thePic = document.querySelector('.profileAvatar');
let selection = 19;

// // Get all Profile pics from database.
// router.get('/uploads', async (req, res) => {
// 	const theUsersPic = await picUsers.findAll({

// 	});

// 	res.status(200).json(theUsersPic);
// });

fetch(`api/users/uploads`)
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		thePic.setAttribute('src', `${data.profile_pic.replace('public', '')}`);
	});

	const uploadForm = document.querySelector('.uploadForm')
	const uploadInput = document.querySelector('.profilePic')

	uploadForm.addEventListener('submit', async (e) => {
		e.preventDefault
		console.log('hey')
		// const file = imageInput.files[0]

		// const { url } = await fetch('/s3Url').then(res > res.json())
		// console.log(url)
	
		 
		if (uploadInput) {
			const response = await fetch('/api/users/uploads', {
				method: 'POST',
				body: uploadInput,
				headers: { 'Content-Type': 'application/json' },
			}).then((data) => {
				
				console.log(data)
				// setTimeout(() => {
				// 	document.location.redirect('/uploads');
				// }, 2000) 
			});
	
			console.log(response);
		}
	
		const clearIt = () => {
			console.log('ran');
			document.querySelector('.textBox').value = '';
			document.querySelector('.titleBox').value = '';
		};
	});	
