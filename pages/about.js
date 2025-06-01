export default function About() {
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold mb-6 text-red-400">About Me</h1>
      
      <div className="prose lg:prose-xl max-w-none">
        <p>
          Hello! I'm Cesar Cano, a Senior Android Developer based in São Paulo, Brazil. I'm passionate about 
          developing native Android applications, libraries, and SDKs. I love debugging and understanding 
          how things work under the hood.
        </p>
        
        <h2>My Skills</h2>
        <ul>
          <li>Android Development (Java/Kotlin)</li>
          <li>Jetpack Compose</li>
          <li>Android Architecture Components</li>
          <li>Dependency Injection (Koin, Hilt)</li>
          <li>Mobile UI/UX Design</li>
        </ul>
        
        <h2>Experience</h2>
        <p>
          I currently work at DoorDash, where I develop and maintain Android applications. 
          I have experience working with various Android frameworks and libraries, and I enjoy 
          solving complex problems in mobile development.
        </p>
        
        <h2>Education</h2>
        <p>
          I hold a Bachelor's degree in Computer Science from Universidade de São Paulo (2013-2018).
        </p>
        
        <h2>Languages</h2>
        <ul>
          <li>Portuguese (Native)</li>
          <li>English (Full professional proficiency)</li>
        </ul>
        
        <h2>Interests</h2>
        <p>
          Outside of coding, I enjoy photography, food, and exploring new technologies. 
          I'm also interested in AI developments and their applications in mobile development.
        </p>
      </div>
    </div>
  );
}
