import MeetupDetails from '../../components/meetups/MeetupDetails';
import { MongoClient, ObjectId } from 'mongodb';

function MeetupDynamicDetails({ meetupData }) {
  return <MeetupDetails meetupData={meetupData} />;
}

export async function getStaticPaths() {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://admin-abay:${process.env.DB_ACCESS_KEY}@cluster0.390sm.mongodb.net/meetups?retryWrites=true&w=majority`
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); //include only ids

    client.close();

    return {
      fallback: false,
      paths: meetups.map((meetup) => ({
        params: { meetupId: meetup._id.toString() },
      })),
    };
  } catch (error) {
    console.error(error.message);
    return {
      paths: '',
    };
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  try {
    const client = await MongoClient.connect(
      `mongodb+srv://admin-abay:${process.env.DB_ACCESS_KEY}@cluster0.390sm.mongodb.net/meetups?retryWrites=true&w=majority`
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({
      _id: ObjectId(meetupId),
    });

    client.close();

    const { _id, title, address, image, description } = selectedMeetup;

    return {
      props: {
        meetupData: {
          id: _id.toString(),
          title,
          address,
          image,
          description,
        },
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      props: {
        meetupData: '',
      },
    };
  }
}

export default MeetupDynamicDetails;
