// /api/new-meetup
// POST /api/new-meetup
import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // const { title, image, address, description } = data;

    try {
      const client = await MongoClient.connect(
        `mongodb+srv://admin-abay:${process.env.DB_ACCESS_KEY}@cluster0.390sm.mongodb.net/meetups?retryWrites=true&w=majority`
      );

      console.log('Connected to database!');

      const db = client.db();

      const meetupsCollection = db.collection('meetups');

      const result = await meetupsCollection.insertOne(data);

      console.log(result);

      client.close();

      res.status(201).json({ message: 'Meetup inserted!' });
    } catch (error) {
      console.error(error.message);
      process.exit(1); //Exit the app is there are errors
    }
  }
}

export default handler;
