import '@/styles/globals.css';
import 'tailwindcss/tailwind.css'; // Ensure this is correctly imported
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
