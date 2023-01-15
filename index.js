const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv').config();


const app = express();
const port = process.env.DB_PORT || 5000;


app.use(cors());
app.use(express.json());

// Database Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t2kmaoa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
	try {
		const productsCollection = client.db("walker-shop").collection("products");
		console.log('Database Connected');

		// POST  Products Add
		app.post('/products', async (req, res) => {
			const product = req.body;
			const result = await productsCollection.insertOne(product);
			res.send(result);
		});

		// GET Products


	} finally {
		// client.close();
	}
}
run().catch(console.dir)


app.get('/', (req, res) => {
	res.send('Hello World')
});


app.listen(port, () => {
	console.log(`E-Commerce App Server listening on port ${port}`);
});