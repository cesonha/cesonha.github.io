export default function Footer() {
  return (
    <footer className="bg-dark-lighter text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <div>
            <p>© {new Date().getFullYear()} <span className="text-red-400">Cesar Cano</span></p>
          </div>
          <div>
            <p>Built with <span className="text-red-400">Next.js</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
