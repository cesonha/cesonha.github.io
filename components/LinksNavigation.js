import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LinksNavigation() {
  const router = useRouter();
  const currentPath = router.pathname;
  
  const linkCategories = [
    { title: 'Music', path: '/links/music' },
    { title: 'Objects', path: '/links/objects' },
    { title: 'Illustration', path: '/links/illustration' },
  ];

  return (
    <div className="mb-8 border-b border-gray-700 pb-4">
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        {linkCategories.map((category) => (
          <Link
            href={category.path}
            key={category.path}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentPath === category.path
                ? 'bg-primary text-text-primary'
                : 'bg-dark-card text-text-secondary hover:bg-dark-lighter'
            }`}
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
