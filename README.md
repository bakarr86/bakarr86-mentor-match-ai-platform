# Mentor Match AI Platform

A full-stack TypeScript mentorship platform inspired by the community partnership between Per Scholas and CGI. Mentor Match connects learners with technology professionals, rewards meaningful participation, and provides conversational AI career guidance.

> This is an independent portfolio prototype. It is not an official Per Scholas or CGI product.

## Live Demo

[View the deployed application](https://per-scholas-mentor-match.bakarr19861.chatgpt.site)

## What the Platform Does

- Matches students and mentors using goals, skills, availability, and career interests
- Provides separate student and mentor tasks
- Awards points for verified career-building activities
- Unlocks résumé reviews, mock interviews, conferences, job-shadowing, and other rewards
- Includes routed pages for Discover, Opportunities, Rewards, Tasks, and the AI Lab
- Offers conversational interview preparation for software engineering and cybersecurity
- Generates meeting agendas, action plans, opportunity guidance, and sample answers
- Supports text-to-speech and minimized, normal, or maximized chat modes
- Includes functional forms, filters, task completion, validation, and confirmation feedback

## AI Architecture

Mentor Command is currently a hybrid conversational agent:

- **Active:** recent conversation memory and follow-up awareness
- **Active:** verified Mentor Match program context and structured coaching workflows
- **Optional:** OpenAI Responses API with live web search when an API key is configured
- **Planned:** document RAG with uploads, chunking, embeddings, vector retrieval, and source citations

The project deliberately describes document RAG as planned rather than claiming an unimplemented capability.

## Technology

- TypeScript 5
- React 19
- Next.js App Router
- Vinext and Vite
- Cloudflare-compatible server runtime
- Server-side API route for the conversational assistant
- OpenAI Responses API integration
- Responsive CSS

## Application Routes

| Route | Purpose |
| --- | --- |
| `/discover` | Mentor and mentee matching |
| `/opportunities` | Conferences, reviews, shadowing, and hiring pathways |
| `/rewards` | Points-based rewards marketplace |
| `/tasks` | Separate student and mentor action lists |
| `/ai-lab` | Agent capabilities and RAG-readiness explanation |
| `/api/concierge` | Conversational assistant backend |

## Run Locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local address shown in the terminal.

To enable broader AI responses, configure `OPENAI_API_KEY` in a local environment file. Never commit API keys to GitHub. Without a key, the built-in smart demo mode still supports program guidance, interview preparation, meeting agendas, tasks, points, and opportunities.

## Production Build

```bash
npm run build
```

## Portfolio Talking Points

- I converted a single-view prototype into typed routed pages without removing functionality.
- I separated reusable program data from the main interface to make the code easier to maintain.
- I designed different incentive systems for students and volunteer mentors.
- I built a conversational backend that remembers context and supports role-specific interview preparation.
- I documented the difference between a conversational agent and a true document-RAG pipeline.
- I treated AI safety and transparency as product requirements instead of marketing labels.

## Future Improvements

- Authenticated student and mentor profiles
- Persistent task and reward records
- Résumé, rubric, and job-description uploads
- Vector database and cited RAG responses
- Calendar scheduling and email notifications
- AWS deployment option using managed AI and storage services

## Author

**Bakarr Kanu**  
Per Scholas Software Engineering alumnus  
GitHub: [@bakarr86](https://github.com/bakarr86)
