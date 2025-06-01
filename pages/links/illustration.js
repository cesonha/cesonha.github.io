import Link from 'next/link';
import LinksNavigation from '../../components/LinksNavigation';
import { getLinkItems } from '../../lib/links';

export default function Illustration({ items }) {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6 text-red-400">Illustration</h1>
      
      <LinksNavigation />
      
      <p className="text-gray-300 mb-6">Illustrations and visual art that catches my eye.</p>
      
      {items.length === 0 ? (
        <p className="mt-4">No illustration links found.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-red-400 transition-colors">
              <h3 className="text-xl font-semibold mb-2 text-red-200">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {item.title} - {item.artist} ({item.year})
                </a>
              </h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const items = getLinkItems('illustration');
  return {
    props: {
      items
    }
  };
}
