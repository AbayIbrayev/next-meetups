/* eslint-disable @next/next/no-img-element */
import classes from './MeetupDetails.module.css';

const MeetupDetails = ({ meetupData }) => {
  const { image, title, address, description } = meetupData;
  return (
    <section className={classes.details}>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
};

export default MeetupDetails;
