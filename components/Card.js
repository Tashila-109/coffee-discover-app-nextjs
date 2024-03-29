import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import styles from './Card.module.css';

const Card = props => {
  return (
    <Link href={props.href}>
      <a className={styles.cardLink}>
        <div className={classNames('glass', styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{props.name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image src={props.imgUrl} alt={props.name} className={styles.cardImage} width={260} height={160} />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
