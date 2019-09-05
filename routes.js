const routes = module.exports = require("next-routes")();

routes
	.add("home", "/", "index") // index  index     /index
	.add("channel", "/:slug.:id", "channel") // channel   channel    /:slug:id
	.add("podcast", "/:slugChannel.:idChannel/:slug.:id", "podcast");
