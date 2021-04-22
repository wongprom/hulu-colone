import Head from 'next/head';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Results from '../components/Results';
import requests from '../utils/requests';

export default function Home({ results }) {
  return (
    <div>
      <Head>
        <title>Hulu 2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* navbar */}
      <Nav />
      <Results results={results} />
    </div>
  );
}
// server side render👇 get executed FIRST, and serve data to client BEFORE client side renders 👆
export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((result) => result.json());

  return {
    props: {
      results: request.results,
    },
  };
}
