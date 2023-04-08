//! db file

const mongoose = require("mongoose");

//to connect to mongoDb(data base)
mongoose.set("strictQuery", true); // this is so that only the field that you create are adde to your schema(document) and so you dont hve a warning
mongoose
	.connect(
		`mongodb+srv://${process.env.user}:${process.env.password}@mearnprojects-1.vhrzvbi.mongodb.net/${process.env.db}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log("Established a connection to the database"))
	.catch((err) =>
		console.log(
			"Something went wrong when connecting to the database ",
			err
		)
	);

//! db file end
