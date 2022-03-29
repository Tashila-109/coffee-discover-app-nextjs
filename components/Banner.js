import styles from './Banner.module.css';

const Banner = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.container}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Connoisseur</span>
      </h1>
      <p className={styles.subTitle}>Discover the local coffee shops!</p>
      <div className={styles.buttonWrapper}>
      <button className={styles.button} onClick={props.onButtonClick}>{props.buttonText}</button>

      </div>
    </div>
  );
};

export default Banner;
