//domain.com
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

function HomePage({ meetups }) {
  return <MeetupList meetups={meetups} />;
}

export async function getStaticProps() {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://admin-abay:${process.env.DB_ACCESS_KEY}@cluster0.390sm.mongodb.net/meetups?retryWrites=true&w=majority`
    );

    console.log('Connected to database!');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    console.log(meetups);
    return {
      props: {
        meetups: meetups.map((meetup) => ({
          title: meetup.title,
          address: meetup.address,
          image: meetup.image.toString(),
          id: meetup._id.toString(),
        })),
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: {
        meetups: '',
      },
      revalidate: 1,
    };
  }
}

export default HomePage;
