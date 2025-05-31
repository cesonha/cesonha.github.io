export default function Home() {
  return (
    <div className="space-y-8">
      <section className="py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Website</h1>
        <p className="text-xl text-gray-600">
          I'm a software developer passionate about creating clean, efficient solutions.
        </p>
      </section>
      
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-4">Featured Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured content cards would go here */}
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-2">Latest Blog Post</h3>
            <p className="text-gray-600 mb-4">Short excerpt from your latest blog post...</p>
            <a href="/blog" className="text-blue-600 hover:underline">Read more</a>
          </div>
          
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-2">Photo Gallery</h3>
            <p className="text-gray-600 mb-4">Check out my latest photos...</p>
            <a href="/photos" className="text-blue-600 hover:underline">View gallery</a>
          </div>
          
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-2">About Me</h3>
            <p className="text-gray-600 mb-4">Learn more about my background and skills...</p>
            <a href="/about" className="text-blue-600 hover:underline">Read more</a>
          </div>
        </div>
      </section>
    </div>
  );
}
