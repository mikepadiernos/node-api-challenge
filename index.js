/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/

// DEFAULT PORT
const port            = process.env.PORT || 4444;

// IMPORT SERVER
const server          = require('./server');

// SERVER LISTEN ON DEFAULT PORT
server
	.listen(port, error => {
		if (error) {
			return console.log("What's the error? ", error);
		}
		console.log("Server is listening on port:", port);
	});