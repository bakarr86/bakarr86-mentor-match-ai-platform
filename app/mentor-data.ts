export type Person = {
  name: string;
  role: string;
  skills: string;
  score: number;
  initials: string;
};

export type Reward = readonly [name: string, points: string, description: string];
export type Opportunity = readonly [name: string, category: string, points: string, description: string];
export type MentorTask = readonly [name: string, timing: string, points: number];
export type AiAgent = readonly [name: string, description: string];

export const people: Person[] = [
  { name: "Maya Thompson", role: "Cloud Solutions Architect", skills: "Azure · Cloud · Consulting", score: 97, initials: "MT" },
  { name: "Andre Williams", role: "Senior Software Engineer", skills: "React · AI · Career Growth", score: 94, initials: "AW" },
  { name: "Priya Shah", role: "Cybersecurity Consultant", skills: "Security · Risk · Interviews", score: 89, initials: "PS" },
];

export const rewards: Reward[] = [
  ["Resume Review", "500", "One-on-one review with an industry professional"],
  ["Mock Interview", "1,000", "Practice with personalized feedback"],
  ["Conference Access", "1,500", "Complimentary admission to a partner event"],
  ["Leadership Session", "2,500", "Meet with a senior industry leader"],
  ["Career Fast Track", "3,000", "Priority interview consideration when qualified"],
  ["Certification Voucher", "2,000", "Support toward an approved technical credential"],
  ["Job Shadow Day", "1,250", "Observe a technology consulting team"],
  ["Innovation Lab Pass", "1,750", "Join a partner innovation workshop"],
];

export const opportunities: Opportunity[] = [
  ["CGI Technology Shadow Day", "Career exposure", "750 pts", "Meet consultants and observe a delivery team"],
  ["Cloud & AI Leadership Forum", "Conference", "1,500 pts", "Complimentary access to an invite-only industry event"],
  ["Technical Portfolio Review", "Career readiness", "500 pts", "Thirty-minute review with a senior engineer"],
  ["Consulting Mock Interview", "Interview prep", "1,000 pts", "Behavioral and technical practice with written feedback"],
  ["Career Fast Track", "Hiring pathway", "3,000 pts", "Priority interview consideration for qualified openings"],
];

export const studentTasks: MentorTask[] = [
  ["Complete mentor goal-setting session", "Due Aug 22", 150],
  ["Upload revised technical resume", "Due Aug 25", 100],
  ["Attend Cloud Career workshop", "Completed Aug 16", 75],
  ["Finish consulting mock interview", "Available now", 200],
  ["Publish a GitHub portfolio project", "Due Sep 2", 250],
  ["Complete mentor feedback survey", "After next session", 50],
  ["Attend a networking event", "This month", 125],
  ["Help a peer review their resume", "Available now", 100],
];

export const mentorTasks: MentorTask[] = [
  ["Complete a mentee goal-setting session", "Due Aug 22", 150],
  ["Review a student resume", "2 requests waiting", 100],
  ["Host a consulting mock interview", "Available now", 200],
  ["Share an industry opportunity", "This week", 75],
  ["Lead a technical workshop", "Schedule this month", 300],
  ["Introduce a mentee to a colleague", "Available now", 175],
  ["Review a GitHub portfolio", "3 requests waiting", 125],
  ["Complete monthly mentor check-in", "Due Aug 30", 75],
];

export const aiAgents: AiAgent[] = [
  ["Match Intelligence", "Compares goals, skills, availability, and communication style"],
  ["Career Coach", "Builds personalized milestones and next-step recommendations"],
  ["Resume Reviewer", "Checks impact, clarity, keywords, and role alignment"],
  ["Mock Interviewer", "Generates role-based questions and feedback"],
  ["Opportunity Scout", "Surfaces relevant events, mentors, and career pathways"],
  ["Quality Guardian", "Reviews AI output for grounding, risk, and missing evidence"],
];
