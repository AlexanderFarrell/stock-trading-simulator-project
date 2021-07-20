const {setupRoutes} = require("./routes");
const {setupMiddleware} = require("./middleware");

function setupApplication(app){
	setupMiddleware(app);
	setupRoutes(app);
}

module.exports = {setupApplication};