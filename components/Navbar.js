import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  
  const navItems = [
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Photos', path: '/photos' },
    { label: 'Art', path: '/art' },
  ];
  
  const socialLinks = [
    { label: 'GitHub', url: 'https://github.com/yourusername', icon: 'github' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: 'linkedin' },
    // Add more as needed
  ];
  
  return (
    <nav className="bg-dark-lighter text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/about" className="text-xl font-bold text-orange-400 hover:text-orange-300 transition-colors">
            Your Name
          </Link>
          
          <div className="flex space-x-6">
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
          
          <div className="flex space-x-4">
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
    </nav>
  );
}
