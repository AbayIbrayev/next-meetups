/* eslint-disable @next/next/no-img-element */
import classes from './MeetupDetails.module.css';

const MeetupDetails = ({ image, title, address, description }) => {
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
