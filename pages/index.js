import Head from 'next/head';
import Image from 'next/image';

import Banner from '../components/Banner';
import Card from '../components/Card';
import coffeeStores from '../data/coffee-stores.json';

import styles from '../styles/Home.module.css';

export default function Home() {
  const handleOnButtonClick = () => {};

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Banner buttonText='View stores nearby' onButtonClick={handleOnButtonClick} />
        <div className={styles.heroImage}>
          <Image src='/static/hero-image.png' alt='Hero-Image' width={700} height={400} />
        </div>
        <div className={styles.cardLayout}>
          {coffeeStores.map(coffeeStore => (
            <Card key={coffeeStore.id} name={coffeeStore.name} imgUrl={coffeeStore.imgUrl} href={`/coffee-store/${coffeeStore.id}`} className={styles.card} />
          ))}
        </div>
      </main>
    </div>
  );
}
