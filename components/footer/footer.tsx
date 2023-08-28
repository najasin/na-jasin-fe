import Image from 'next/image'
import Link from 'next/link'

import styles from './footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>© Na-JaSin</div>
        <div className={styles.infoContainer}>
          <Link href="/our-story" className={styles.about}>
            우리들의 이야기
          </Link>
        </div>
        <div className={styles.iconContainer}>
          <Link
            href="mailto:najasinpro@gmail.com"
            className={styles.icon}
            target="_blank"
          >
            <Image src="/images/email-grey.svg" alt="email" fill={true} />
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=61550778628237"
            className={styles.icon}
            target="_blank"
          >
            <Image src="/images/facebook-grey.svg" alt="facebook" fill={true} />
          </Link>
          <Link
            href="https://www.instagram.com/na_jasin_page/"
            className={styles.icon}
            target="_blank"
          >
            <Image
              src="/images/instagram-grey.svg"
              alt="instagram"
              fill={true}
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}
