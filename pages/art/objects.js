import { getArtItems } from '../../lib/art';
import ArtNavigation from '../../components/ArtNavigation';

export default function Objects({ items }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-red-400">Objects</h1>
      
      <ArtNavigation />
      
      <p className="text-gray-300 mb-6">Interesting objects and designs that I appreciate.</p>
      
      {items.length === 0 ? (
        <p className="mt-4">No object items found.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div key={index} className="bg-dark-card rounded shadow-md overflow-hidden border border-gray-800 p-4">
              <h2 className="text-xl font-semibold mb-2 text-orange-300">{item.title}</h2>
              <p className="text-gray-300 mb-3">{item.description}</p>
              {item.link && (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-300 hover:text-red-200 transition-colors"
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
  const items = getArtItems('objects');
  return {
    props: {
      items
    }
  };
}
