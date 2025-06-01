import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchBar from './SearchBar';

export default function Navbar({ allContent }) {
  const router = useRouter();
  
  const navItems = [
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Photos', path: '/photos' },
    { label: 'Art', path: '/art' },
  ];
  
  const socialLinks = [
    { label: 'GitHub', url: 'https://github.com/cesonha', icon: 'github' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/cesar-cano-de-oliveira', icon: 'linkedin' },
    { label: 'StackOverflow', url: 'https://stackoverflow.com/users/3005235/cesonha', icon: 'stackoverflow' },
  ];
  
  return (
    <nav className="bg-dark-lighter text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <Link href="/about" className="text-xl font-bold text-red-400 hover:text-red-300 transition-colors mb-4 md:mb-0">
            Cesar Cano
          </Link>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-4 md:mb-0">
            {navItems.map((item) => (
              <Link 
                href={item.path} 
                key={item.path}
                className={`hover:text-primary transition-colors ${
                  router.pathname === item.path ? 'text-primary font-bold' : 'text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <SearchBar allContent={allContent} />
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a 
                  href={link.url} 
                  key={link.label}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
