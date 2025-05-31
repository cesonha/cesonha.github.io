import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Photos', path: '/photos' },
  ];
  
  const socialLinks = [
    { label: 'GitHub', url: 'https://github.com/yourusername', icon: 'github' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: 'linkedin' },
    // Add more as needed
  ];
  
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold">Your Name</div>
          
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link 
                href={item.path} 
                key={item.path}
                className={`hover:text-gray-300 ${
                  router.pathname === item.path ? 'text-white font-bold' : 'text-gray-300'
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
                className="text-gray-300 hover:text-white"
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
