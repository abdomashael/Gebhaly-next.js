
import Link from 'next/link'
import Navbar from '../navbar/navbar'
import styles from './layout.module.scss'
export default function Layout({ children, home }) {
    return (
      <div>
      
        <Navbar/>
        <main className={styles.conatiner} >{children}</main>

      </div>
    )
  }