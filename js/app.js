const express = require('express'); // express module
const bodyParser = require('body-parser'); // body-parser middleware
const emailTemplate = require('../controllers/emailTemplateController'); // emailTemplateController module
const suggestions = require('../controllers/suggestions'); //Suggestions Controller

// Dynamic port listener
const port = process.env.PORT || 3000; // set port
const app = express(); // express init
app.use(bodyParser.json()); // Middleware use with express

emailTemplate(app);
suggestions(app);

// Listen on port
app.listen(port, () => console.log(`Listening on port ${port}...`));