import { CuratedVideo } from "../lib/types";

// Featured beginner lesson
export const MY_LATEST_VIDEO: CuratedVideo = {
  id: "LPZh9BOjkQs",
  title: "Large Language Models explained briefly",
  channelName: "3Blue1Brown",
  tags: ["LLM", "Generative AI", "Beginner"],
  commentary: "Start here. Discover how language models generate text, how they learn from training data, and why predicting likely words can produce remarkably fluent responses.",
  dateAdded: "2026-10-21"
};

// Curated introductory video library
export const CURATED_LIBRARY: CuratedVideo[] = [
  {
    id: "PeMlggyqz0Y",
    title: "Machine Learning Explained in 100 Seconds",
    channelName: "Fireship",
    tags: ["Machine Learning", "Beginner"],
    commentary: "A quick introduction to learning patterns from data instead of explicitly programming every decision. Begin with the difference between training a model and using it to make predictions.",
    dateAdded: "2026-10-21"
  },
  {
    id: "9gGnTQTYNaE",
    title: "What is Machine Learning?",
    channelName: "IBM Technology",
    tags: ["Machine Learning", "Supervised Learning", "AI"],
    commentary: "Understand the relationship between AI, machine learning, and deep learning. Introduces supervised, unsupervised, and reinforcement learning with accessible explanations.",
    dateAdded: "2026-10-21"
  },
  {
    id: "cfqtFvWOfg0",
    title: "Why Large Language Models Hallucinate",
    channelName: "IBM Technology",
    tags: ["LLM", "Limitations", "Hallucinations"],
    commentary: "Why can an AI system produce a confident but incorrect answer? Learn about fabricated information and why important scientific claims require verification against reliable sources.",
    dateAdded: "2026-10-21"
  }
];
