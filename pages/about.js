export default function About() {
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold mb-6 text-primary-light">About Me</h1>
      
      <div className="prose prose-invert lg:prose-xl max-w-none">
        <p>
          Hello! I'm Cesar Cano, a Senior Android Developer based in São Paulo, Brazil. I develop native 
          Android applications, libraries, and SDKs at DoorDash. I'm passionate about debugging and understanding 
          how things work under the hood.
        </p>
        
        <p>
          With a background in Computer Science from Universidade de São Paulo, I've built expertise in 
          Android Development with Java and Kotlin, Jetpack Compose, Architecture Components, and various 
          dependency injection frameworks like Koin and Hilt. I enjoy tackling complex problems in mobile 
          development and creating intuitive user experiences.
        </p>
        
        <p>
          When I'm not coding, you'll find me exploring my interests in photography, trying new foods, 
          and keeping up with emerging technologies. I'm particularly fascinated by AI advancements and 
          their potential applications in mobile development.
        </p>
      </div>
    </div>
  );
}
