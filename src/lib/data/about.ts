export interface AboutData {
  paragraphs: string[];
  competencies: Competency[];
}

export interface Competency {
  text: string;
}

export const aboutData: AboutData = {
  paragraphs: [
    "I'm a passionate Game and Interactive Media Developer with a deep love for creating immersive digital experiences. My journey in game development started with a fascination for how interactive media can transform ideas into engaging experiences that captivate and inspire users.",
    "Throughout my career, I've focused on bridging the gap between creativity and technology, using my expertise in Unity and various programming languages to bring innovative ideas to life. I believe in the power of games and interactive media to not just entertain, but also educate and create meaningful connections.",
    "What drives me is the opportunity to push the boundaries of what's possible in interactive media. Whether it's developing intuitive AR/VR experiences, creating engaging mobile games, or integrating cutting-edge AI solutions, I'm always excited to explore new technologies and find creative ways to solve complex challenges.",
    "I'm currently exploring opportunities to collaborate on ambitious projects where I can contribute my expertise in game development and interactive media, while continuing to learn and grow in this ever-evolving field."
  ],
  competencies: [
    {
      text: "Innovative problem-solver with a proven track record of turning complex technical challenges into elegant, user-friendly solutions"
    },
    {
      text: "Strong advocate for clean code and optimization, consistently delivering high-performance applications that exceed expectations"
    },
    {
      text: "Experienced in rapid prototyping and agile development, adapting quickly to new technologies and project requirements"
    },
    {
      text: "Dedicated to creating immersive user experiences through a combination of technical expertise and creative design"
    },
    {
      text: "Committed to continuous learning and staying current with emerging technologies in game development and interactive media"
    }
  ]
};