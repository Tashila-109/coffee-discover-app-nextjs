import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { fetchCoffeeStores } from '../../lib/coffee-stores';

import styles from '../../styles/coffee-store.module.css';

const CoffeeStore = props => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { location, name, imgUrl } = props.coffeeStore;

  const hanelUpvoteButton = () => {
    console.log('Up vote');
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/'>
              <a>Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image src={imgUrl} width={600} height={360} className={styles.storeImg} alt={name} />
        </div>

        <div className={classNames('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src='/static/icons/places.svg' width={24} height={24} alt='Places' />
            <p className={styles.text}>{location.address}</p>
          </div>

          {location.region && (
            <div className={styles.iconWrapper}>
              <Image src='/static/icons/nearMe.svg' width={24} height={24} alt='Near Me' />
              <p className={styles.text}>{location.region}</p>
            </div>
          )}

          <div className={styles.iconWrapper}>
            <Image src='/static/icons/star.svg' width={24} height={24} alt='Star' />
            <p className={styles.text}>{1}</p>
          </div>

          <button className={styles.upvoteButton} onClick={hanelUpvoteButton}>
            Up Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStore: coffeeStores.find(coffeeStore => coffeeStore.id.toString() === params.id),
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores.map(coffeeStore => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export default CoffeeStore;
