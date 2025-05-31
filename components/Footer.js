export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <p>© {new Date().getFullYear()} Your Name</p>
          </div>
          <div>
            <p>Built with Next.js</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
