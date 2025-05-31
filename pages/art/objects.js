import { getArtItems } from '../../lib/art';
import Link from 'next/link';

export default function Objects({ items }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-red-400">Objects</h1>
      <p className="text-gray-300 mb-6">Interesting objects and designs that I appreciate.</p>
      
      <Link href="/art" className="text-red-300 hover:text-red-200 mb-6 inline-block">
        ← Back to Art Collections
      </Link>
      
      {items.length === 0 ? (
        <p className="mt-4">No object items found.</p>
      ) : (
        <div className="mt-6 space-y-8">
          {items.map((item, index) => (
            <div key={index} className="bg-dark-card rounded shadow-md overflow-hidden border border-gray-800 p-4">
              <h2 className="text-xl font-semibold mb-2 text-orange-300">{item.title}</h2>
              {item.creator && <p className="text-gray-300 mb-1">Creator: {item.creator}</p>}
              {item.year && <p className="text-gray-400 text-sm mb-3">Year: {item.year}</p>}
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
