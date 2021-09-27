//domain.com
import MeetupList from '../components/meetups/MeetupList';

function HomePage({ meetups }) {
  return <MeetupList meetups={meetups} />;
}

export async function getStaticProps() {
  return {
    props: {
      meetups: '',
    },
    revalidate: 1,
  };
}

export default HomePage;
