import Link from "next/link";
import Head from "next/head";



const Custom500: React.FC = () => {
  return (
    <>
      <Head>
        <title>500 - Internal Server Error</title>
        <meta name="description" content="500 - Internal Server Error" />
      </Head>
      <main className="container mx-auto p-4 flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">500 - Internal Server Error</h1>
        <p className="mb-4">Sorry, something went wrong on our end.</p>
        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/">
          Go back home
        </Link>
      </main>
    </>
  );
}

export default Custom500;