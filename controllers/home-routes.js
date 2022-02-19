const router = require('express').Router();
const { Takes, Users, Comment, Pick } = require('../models');
const withAuth = require('../utils/auth');
// deprecated code v
// const Takes = require('../models/Takes.js');

// Render the Main page of Takes.
router.get('/', async (req, res) => {
	req.session.save(() => {
		req.session.countVisit ? req.session.countVisit++ :
		req.session.countVisit = 1
	})
	try {
		const dbTakesData = await Takes.findAll({
			include: [
				{
				  model: Users,
				  attributes: ['username'],
				},
				{
				  model: Comment,
				  attributes: ['text'],
				},
			  ],
		});

		const theTakes = dbTakesData.map((blog) => blog.get({ plain: true }));
		// console.log('The Takes:', theTakes[0].title);


		// res.send(theTakes);

		res.render('homepage', {
			theTakes,
			countVisit: req.session.countVisit,
			logged_in: req.session.logged_in,
			isMember: req.session.member,
			userPic: req.session.profilePic,
			username: req.session.theName  
			 
			
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// Render registration page.
router.get('/register', async (req, res) => {
	try {
		res.render('register', {
			isMember: req.session.member
		}
		);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// Render Login page.
// router.get('/login', async (req, res) => {
// 	req.session.member ? res.redirect('/') :
// 	res.render('login')
// 	try {
// 		res.render('login');
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).json(err);
// 	}
// });

router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/');
		return;
	  }
	
	  res.render('login');
	});



// Render profile page when the user is signed in and clicks loge.

// router.get('/profile', async (req, res) => {
// 	try {
// 		res.render('profile', {
// 			isMember: req.session.member,
// 			userPic: req.session.profilePic,
// 			username: req.session.theName,
// 			countVisit: req.session.countVisit
			
// 		}
// 		);
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).json(err);
// 	}
// });

router.get('/profile',withAuth, async (req, res) => {
	try {
		// Find the logged in user based on the session ID
		const userData = await Users.findByPk(req.session.user_id, {
		  attributes: { exclude: ['password'] },
		//   include: [{ model: Takes }],
		include: [
			{
			  model: Takes,
			//   attributes: ['username'],
			},
			{
			  model: Pick,
			//   attributes: ['text'],
			},
		  ],
		});
		
		// const money = "lots of money"
		// const user = userData.get({ plain: true });

// user takes and likes on the take
		const takeData = await Takes.findAll({
			where: {
			  user_id: req.session.user_id,
			//   user_id: 5,
			},
			include: [
				{
				  model: Pick,
				//   attributes: ['username'],
				},
			  ],
		  });
		  const theTakes = takeData.map((blog) => blog.get({ plain: true }));
		//   const cleantakes = takeData.get({ plain: true });

// connections
// const projectData = await Users.findByPk( req.params.id, {
const projectData = await Users.findByPk( req.session.user_id, {

attributes: ["id",'username'],
include: [
  {
	model: Pick,
	attributes: ["take_id"],
  },
],
});

let projects = projectData.get({ plain: true });

// array for user picks
let myPicks = []

// username
let myName = projects.username

// creating a array with only the users picks
projects.picks.forEach(item => { myPicks.push (item.take_id)


});

// Get all users and picks
const pullData = await Users.findAll({

attributes: ["id",'username'],
include: [
  {
	model: Pick,
	attributes: ["take_id"],
  },
],
});

// Clean data up so it's easier to work with
const allData = pullData.map((project) => project.get({ plain: true }));

// create array to hold people that made the same picks as you
let matches = []

// iterate through all users
allData.forEach(user => { 
  let test = 0
  let take =[]
  // if the names of the users don't match continue
  if (user.username !== myName) {

	// iterate through my picks
	myPicks.forEach(item =>{

	  // iterate through current users picks
	   for (let i = 0; i < user.picks.length; i++) {

	if (item === user.picks[i].take_id) {
	  // test.push (user.user_name)
	  test++
	  take.push ({item})
	  i = user.picks.length
	}
	}
  })

  }
  // if myself and the user has atleast a certain about of picks in common then add to matches
  if (test >= 1) {
	matches.push ({"username" : user.username, "take": take})
  }
});
// send the matches
//   res.send (matches);




		// res.send({takeData})
	
		res.render('profile', {
			theTakes,
		
		"connections":matches,
		isMember: req.session.member,
		userPic: req.session.profilePic,
		username: req.session.theName,
		countVisit: req.session.countVisit,
		
		  logged_in: true
		});
	  } catch (err) {
		res.status(500).json(err);
	  }
	});

module.exports = router;
