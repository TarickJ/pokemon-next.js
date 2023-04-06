import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Layout.module.css'

const Layout = ({ children }) => {
  return (
    <>
      {/* Set the title of the page */}
      <Head>
        <title>PokeDex</title>
      </Head>
      {/* Create a container for the pokedex */}
      <div className={styles.pokedex}>
        {/* Create a header with navigation */}
        <header className={styles.header}>
          <nav className={styles.nav}>
            <ul>
              {/* Add a link to the home page */}
              <li>
                <Link href="/" legacyBehavior>
                  <a>Home</a>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {/* Add the main content */}
        <main className={styles.main}>{children}</main>
        {/* Add a footer */}
        <footer className={styles.footer}>
          <p>© 2023 Pokedex</p>
        </footer>
      </div>
    </>
  )
}

export default Layout
