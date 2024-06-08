// pages/404.tsx
import Link from "next/link";
import Head from "next/head";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="404 - Page Not Found" />
      </Head>
      <main className="container mx-auto p-4 flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-4">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/"
          title="Go back home"
        >
          Go back home
        </Link>
      </main>
    </>
  );
};

export default Custom404;
