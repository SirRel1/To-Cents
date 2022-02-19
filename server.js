const path = require('path');
const express = require('express');

const session = require('express-session');
const exphbs = require('express-handlebars');
require('dotenv').config();

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;



const sess = {
	cookie: {
		maxAge: 1000 * 60 * 60 * 2,
		sameSite: true
	},
	secret: process.env.SECRET,
	resave: false,
	saveUnintialized: true,
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
// app.use('/uploads', express.static('uploads'))
app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}!`));
});
