const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv').config();


const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

// Database Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t2kmaoa.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
	const collection = client.db("test").collection("devices");
	console.log('Database Connected');
	// perform actions on the collection object
	// client.close();
});


app.get('/', (req, res) => {
	res.send('Hello World')
});


app.listen(port, () => {
	console.log(`E-Commerce App Server listening on port ${port}`);
});