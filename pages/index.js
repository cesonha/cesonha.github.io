import Home from './home';

export default function Index(props) {
  return <Home {...props} />;
}

export { getStaticProps } from './home';
