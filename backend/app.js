"use strict";
const path = require("path");
const express = require("express");
const beispieleJSON = require("./routes/beispieleJSON-router.js");
const beispieleTXT = require("./routes/beispieleTXT-router.js");
const { beispiele } = require("./lib/beispiele-list");

// Create the express app
const app = express();
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
app.set("views", path.join(__dirname, "../frontend/"));
// Routes and middleware
// app.use(/* ... */)
app.get(["/", "/index.html"], async (req, res) => {
	let response;
	try {
		response = await beispiele();
	} catch (err) {
		return res.status(404).send(err.message);
	}
	return res.render("index", { beispiele: response });
});

app.use("/beispieleJSON", beispieleJSON);
app.use('/beispieleTXT', beispieleTXT);
app.use("", express.static("../frontend"));
// Error handlers als Letzte
app.use(function fourOhFourHandler(req, res) {
	res.status(404).send();
});
app.use(function fiveHundredHandler(err, req, res, next) {
	console.error(err);
	res.status(500).send();
});

// Start server
app.listen(1234, function (err) {
	if (err) {
		return console.error(err);
	}

	console.log(
		`Started ${new Date().toLocaleTimeString()} http://localhost:1234`
	);
});
