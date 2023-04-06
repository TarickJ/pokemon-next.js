import Layout from '../../components/Layout'; // import the Layout component
import styles from '../../styles/Pokemon.module.css'; // import styles for the Pokemon page

const PokemonPage = ({ pokemon }) => { // declare a function component with `pokemon` as the props
  return (
    <Layout title={pokemon.name}>
      {/* render pokemon */}
      <div className={styles.container}> /
        <h1 className={styles.title}>{pokemon.name}</h1>
        <img className={styles.image} src={pokemon.imageUrl} alt={pokemon.name} />
        <p className={styles.detail}>Type: {pokemon.type}</p>
        <p className={styles.detail}>Height: {pokemon.height} m</p> 
        <p className={styles.detail}>Weight: {pokemon.weight} kg</p>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() { // declare the getStaticPaths function for pre-generating paths
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151'); // fetch the pokemon list data
  const data = await response.json(); // convert the response to JSON

  const paths = data.results.map((pokemon, index) => ({ // map the pokemon list data to paths
    params: { id: `${index + 1}` } // set the id of each pokemon as a path parameter
  }));

  return {
    paths, // return the paths
    fallback: false // set fallback to false to return 404 for paths that are not pre-generated
  };
}

export async function getStaticProps({ params }) { // declare the getStaticProps function for pre-generating props
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`); // fetch the pokemon data using the id parameter
  const data = await response.json(); // convert the response to JSON

  const pokemon = { // set the pokemon object with the data properties
    name: data.name,
    type: data.types[0].type.name,
    height: data.height / 10,
    weight: data.weight / 10,
    imageUrl: data.sprites.other['official-artwork'].front_default
  };

  return {
    props: {
      pokemon // return the pokemon object as props
    }
  };
}

export default PokemonPage; // export the PokemonPage component as the default export
