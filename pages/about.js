export default function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-red-400">About Me</h1>
      
      <div className="prose lg:prose-xl max-w-none">
        <p>
          Hello! I'm a software developer with a passion for creating clean, 
          efficient, and user-friendly applications. I specialize in web development
          and enjoy working with modern technologies.
        </p>
        
        <h2>My Skills</h2>
        <ul>
          <li>JavaScript/TypeScript</li>
          <li>React & Next.js</li>
          <li>Node.js</li>
          <li>HTML/CSS</li>
          <li>And more...</li>
        </ul>
        
        <h2>Experience</h2>
        <p>
          I have X years of experience working in the software industry, 
          contributing to projects ranging from small startups to large enterprise applications.
        </p>
        
        <h2>Education</h2>
        <p>
          I hold a degree in Computer Science from University Name.
        </p>
        
        <h2>Interests</h2>
        <p>
          Outside of coding, I enjoy photography, hiking, and reading.
        </p>
      </div>
    </div>
  );
}
