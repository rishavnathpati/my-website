export interface AboutData {
  summary: string;
  paragraphs: string[];
  competencies: Competency[];
}

export interface Competency {
  text: string;
}

export const aboutData: AboutData = {
  summary: "I build AI-driven NPCs, speech systems, and VR characters in Unity so teams can drop believable interactions straight into their projects.",
  paragraphs: [
    "I'm Rishav — I spend most of my time inside Unity making characters feel alive. That means building speech pipelines, AI-driven behaviours, and VR interactions that hold up in real-time environments instead of just demos.",
    "At Convai I own the messy middle ground between research demos and something a studio can trust. I wire streaming speech into Unity, craft prompts that keep personalities on track, build debugging tools for designers, and chase latency budgets so Quest players don't feel the seams.",
    "VR and Quest 3 experiments are my playground for testing how people actually move, look, and talk to virtual characters. I've prototyped reactive body language, fingertip cues, and network-friendly systems that keep NPCs responsive without melting the headset.",
    "When a project needs glue, I write it — lightweight Python services, CLI utilities, or Android helpers that let the main experience stay focused. Good tools and clear docs make it easier for writers, designers, and other programmers to collaborate without reverse-engineering my brain."
  ],
  competencies: [
    {
      text: "Real-time interaction in Unity: speech, AI NPCs, VR, and networking"
    },
    {
      text: "Fast prototyping without wrecking long-term maintainability"
    },
    {
      text: "Performance-minded development for mobile and VR platforms"
    },
    {
      text: "Tooling and editor UX for other developers and content creators"
    },
    {
      text: "Glue code: small Python backends, CLIs, and integrations when needed"
    }
  ]
};
