import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ArtNavigation() {
  const router = useRouter();
  const currentPath = router.pathname;
  
  const artCategories = [
    { title: 'Music', path: '/art/music' },
    { title: 'Objects', path: '/art/objects' },
    { title: 'Illustration', path: '/art/illustration' },
  ];

  return (
    <div className="mb-8 border-b border-dark-border pb-4">
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        {artCategories.map((category) => (
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
