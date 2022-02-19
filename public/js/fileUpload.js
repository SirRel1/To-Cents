// const multer = require('multer')

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

fetch(`https://the-cents.s3.amazonaws.com/Turtle.jpg`)
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		thePic.setAttribute('src', `${data.profile_pic.replace('public', '')}`);
	});
