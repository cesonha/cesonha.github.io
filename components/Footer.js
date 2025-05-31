export default function Footer() {
  return (
    <footer className="bg-dark-lighter text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <p>© {new Date().getFullYear()} <span className="text-accent">Your Name</span></p>
          </div>
          <div>
            <p>Built with <span className="text-primary">Next.js</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
