import Link from 'next/link'; // import Link component from next/link
import Layout from '../components/Layout'; // import Layout component from ../components/Layout
import styles from '../styles/Index.module.css'; // import styles from ../styles/Index.module.css

const IndexPage = ({ pokemonList }) => {
  return (
    <Layout> {/* render the Layout component */}
      <div className={styles.container}>
        <h1>Pokemon List</h1>
        <div className={styles.grid}>
          {/* iterate over the pokemonList and render a Link component with each pokemon */}
          {pokemonList.map(pokemon => (
            <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`} legacyBehavior>
              <a className={styles.card}>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
                <h2>{pokemon.name}</h2>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // fetch pokemon data from pokeapi.co and convert it to a format that can be used by our component
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await response.json();

  const pokemonList = data.results.map((pokemon, index) => ({
    id: index + 1,
    name: pokemon.name,
    url: pokemon.url
  }));

  return {
    props: {
      pokemonList
    }
  };
}

export default IndexPage; // export the component as default
