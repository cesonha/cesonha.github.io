import Link from 'next/link';
import LinksNavigation from '../../components/LinksNavigation';
import { getLinkItems } from '../../lib/links';

export default function Objects({ items }) {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6 text-primary-light">Objects</h1>
      
      <LinksNavigation />
      
      <p className="text-text-secondary mb-6">Interesting objects and designs that I appreciate.</p>
      
      {items.length === 0 ? (
        <p className="mt-4">No object links found.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="bg-dark-card p-4 rounded-lg border border-dark-border hover:border-primary-light transition-colors">
              <h3 className="text-xl font-semibold mb-2 text-primary-lighter">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {item.title} - {item.creator} ({item.year})
                </a>
              </h3>
              <p className="text-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const items = getLinkItems('objects');
  return {
    props: {
      items
    }
  };
}
