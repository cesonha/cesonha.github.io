import Link from 'next/link';

export default function Art() {
  const artSections = [
    { 
      title: 'Music', 
      path: '/art/music',
      description: 'My favorite music, artists, and albums that inspire me.',
      icon: '🎵'
    },
    { 
      title: 'Objects', 
      path: '/art/objects',
      description: 'Interesting objects, designs, and artifacts I appreciate.',
      icon: '🏺'
    },
    { 
      title: 'Illustration', 
      path: '/art/illustration',
      description: 'Illustrations, drawings, and visual art that catches my eye.',
      icon: '🎨'
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-red-400">Art Collections</h1>
      <p className="text-gray-300 mb-8">
        A curated collection of art in various forms that inspires me. Browse through different categories below.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artSections.map((section) => (
          <Link 
            href={section.path} 
            key={section.path}
            className="block group"
          >
            <div className="bg-dark-card rounded shadow-md overflow-hidden border border-gray-800 hover:border-red-500 transition-colors p-6">
              <div className="text-4xl mb-4">{section.icon}</div>
              <h2 className="text-xl font-semibold mb-2 text-orange-300 group-hover:text-orange-200 transition-colors">
                {section.title}
              </h2>
              <p className="text-gray-300">{section.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
