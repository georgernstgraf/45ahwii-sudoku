import * as path from "node:path";
import express from "npm:express";
import * as ejs from "npm:ejs";
import { router as beispieleJSON } from "./routes/beispieleJSON-router.js";
import { router as beispieleTXT } from "./routes/beispieleTXT-router.js";
import { beispiele } from "./lib/beispiele-list.js";

// Create the express app
const app = express();
app.set("view engine", "html");
app.engine("html", ejs.renderFile);
app.set("views", path.join(import.meta.dirname, "../frontend/"));
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
app.use("/beispieleTXT", beispieleTXT);
app.use("", express.static("./frontend"));
// Error handlers als Letzte
app.use(function fourOhFourHandler(req, res) {
	res.status(404).send();
});
app.use(function fiveHundredHandler(err, req, res, next) {
	console.error(err);
	res.status(500).send();
});

// Start server
app.listen(1234, "0.0.0.0", function (err) {
	if (err) {
		return console.error(err);
	}

	console.log(
		`Started ${new Date().toLocaleTimeString()} http://localhost:1234`,
	);
});
