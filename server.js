const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const router = require('express').Router();
require('dotenv').config();

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 8080;



const sess = {
	cookie: {
		secure: false,
		httpOnly: false,
		maxAge: 1000 * 60 * 60 * 2,
		sameSite: true
	},
	secret: process.env.SECRET,
	resave: true,
	saveUnintialized: false,
	store: new SequelizeStore({
		db: sequelize
	  })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/profile', router)
app.use(routes);
app.get('/s3Url', async (req, res) => {
	const url = s3.generateUploadURL()
	res.send({url})

})

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}!`));
});
