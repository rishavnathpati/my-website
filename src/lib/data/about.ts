export interface AboutData {
  paragraphs: string[];
  competencies: Competency[];
}

export interface Competency {
  text: string;
}

export const aboutData: AboutData = {
  paragraphs: [
    "I'm Rishav, a game and interactive media developer who likes building things where real-time interaction actually matters — AI-driven NPCs, speech systems, and VR worlds.",
    "Right now I work at Convai as an Interactive Media Developer, mostly inside Unity. I spend a lot of time wiring up conversational AI to characters, streaming speech to and from the engine, and making sure these systems feel solid enough that other developers can drop them into their own projects without thinking too hard.",
    "Before that, I shipped a bunch of small games for mobile and PC: casual, hyper-casual, a few educational ones. That phase taught me how to prototype quickly, cut scope without killing the fun, and keep performance in mind from day one.",
    "On the side, I tinker with Python backends, small CLIs, and the occasional Android or ML-flavoured experiment — nothing huge, but enough to glue systems together and explore new ideas. I care a lot about tools, workflows, and making complex tech feel approachable, both for players and for other developers."
  ],
  competencies: [
    {
      text: "Building real-time systems in Unity (speech, AI NPCs, VR, networking)"
    },
    {
      text: "Shipping prototypes quickly while keeping the codebase understandable for v2"
    },
    {
      text: "Designing tools and editor workflows that make other developers' lives easier"
    },
    {
      text: "Optimizing scenes and systems for performance on constrained hardware (mobile, VR)"
    },
    {
      text: "Connecting Unity with backend services using gRPC / REST and lightweight Python services"
    },
    {
      text: "Explaining technical ideas clearly through docs, examples, and conversations"
    },
    {
      text: "Collaborating across disciplines — programmers, designers, writers, and artists"
    },
    {
      text: "Exploring new tech (ML, Android, audio tools) enough to integrate it into real projects"
    }
  ]
};