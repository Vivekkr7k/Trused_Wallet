const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");



mongoose.connect("mongodb+srv://vivekmunda1212:btc-pass@cluster0.vjdmjkv.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const LoginData = mongoose.model("LoginData", {
  UserEmailId: String,
  GeneratedKey: String,
  CoinBalace: String
});

app.use(express.json());
app.use(cors());

// Enable CORS if needed
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Your other middleware and routes...

// Route to handle generating and storing the key
app.post("/generate-key", async (req, res) => {
  try {
    const { email } = req.body;
    const existingData = await LoginData.findOne({ UserEmailId: email });

    if (existingData) {
      // Data with this email already exists, don't generate a new key
      res.json({ message: "Data already exists for this email" });
    } else {
      // Generate a 20-digit random alphanumeric key
      const generatedKey = generateRandomKey(20);

      // Create and save a new document in the LoginData collection
      const newData = new LoginData({ UserEmailId: email, GeneratedKey: generatedKey , CoinBalace:0  });
      await newData.save();

      res.json({ message: "Data created successfully", generatedKey });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

  
app.get("/get-all-data", async (req, res) => {
    try {
      // Retrieve all documents from the LoginData collection
      const allData = await LoginData.find({});
      res.json(allData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  



// Start your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Function to generate a random alphanumeric key
function generateRandomKey(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}



const MongoClient = require('mongodb').MongoClient;

const mongoURI = 'mongodb+srv://vivekmunda1212:btc-pass@cluster0.vjdmjkv.mongodb.net/?retryWrites=true&w=majority'; // MongoDB URI for your specific database
const dbName = 'test'; // Name of your database
const collectionName = 'logindatas'; // Name of the collection

// Establish a connection to the MongoDB database
MongoClient.connect(mongoURI, async (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB');

  try {
    const db = client.db(dbName);

    // Fetch all documents from the "logindatas" collection
    const allData = await db.collection(collectionName).find({}).toArray();
    
    console.log('All Data:', allData);

    // Do something with the retrieved data here, such as sending it as an API response
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
  } finally {
    // Close the MongoDB connection when done
    client.close();
  }
});