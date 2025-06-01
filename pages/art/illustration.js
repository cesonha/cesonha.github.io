import { getArtItems } from '../../lib/art';
import ArtNavigation from '../../components/ArtNavigation';

export default function Illustration({ items }) {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6 text-primary-light">Illustration</h1>
      
      <ArtNavigation />
      
      <p className="text-text-secondary mb-6">Illustrations and visual art that catches my eye.</p>
      
      {items.length === 0 ? (
        <p className="mt-4">No illustration items found.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div key={index} className="bg-dark-card rounded shadow-md overflow-hidden border border-dark-border p-4">
              <h2 className="text-xl font-semibold mb-2 text-primary-light">{item.title}</h2>
              <p className="text-text-secondary mb-3">{item.description}</p>
              {item.link && (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-light hover:text-primary-hover transition-colors"
                >
                  View →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const items = getArtItems('illustration');
  return {
    props: {
      items
    }
  };
}
