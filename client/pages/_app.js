import "bootstrap/dist/css/bootstrap.css";

// what this is doing is creating our own App component
// thin wrapper around what we show on the screen

export default ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
