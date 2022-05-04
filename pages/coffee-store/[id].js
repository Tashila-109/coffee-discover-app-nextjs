import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import coffeeStoresData from '../../data/coffee-stores.json';

const CoffeeStore = props => {
  const router = useRouter();

  const { address, name, neighbourhood } = props;

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href='/'>
        <a>Backl to home</a>
      </Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </div>
  );
};

export function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: coffeeStoresData.find(coffeeStore => coffeeStore.id.toString() === params.id),
    }, // will be passed to the page component as props
  };
}

export function getStaticPaths() {
  const paths = coffeeStoresData.map(coffeeStore => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export default CoffeeStore;
