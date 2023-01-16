const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const fileUpload = require('express-fileupload');


const app = express();
const port = process.env.DB_PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Database Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t2kmaoa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
	try {
		const productsCollection = client.db("walker-shop").collection("products");
		console.log('Database Connected');

		// POST  Products add
		app.post('/products', async (req, res) => {
			const title = req.body.title;
			const price = req.body.price;
			const oldPice = req.body.oldPrice;
			const pic = req.files.image;
			const picData = pic.data;
			const encodedPic = picData.toString('base64');
			const imgBuffer = Buffer.from(encodedPic, 'base64');
			const pic1 = req.files.image1;
			const picData1 = pic1.data;
			const encodedPic1 = picData1.toString('base64');
			const imgBuffer1 = Buffer.from(encodedPic1, 'base64');
			const product = {
				title,
				images: {
					imgBuffer, imgBuffer1
				},
				price,
				oldPice
			};
			const result = await productsCollection.insertOne(product);
			res.send(result);
		});

		// GET Products
		app.get('/products', async (req, res) => {
			const products = await productsCollection.find().toArray();
			res.send(products)
		});

		// GET Single products
		app.use('/products/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await productsCollection.findOne(query);
			res.send(result);
		});


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