"use client";
import Link from "next/link";
import { useState } from "react";
import { aiAgents, mentorTasks, opportunities, people, rewards, studentTasks } from "./mentor-data";

export type DashboardTab = "matches" | "opportunities" | "rewards" | "progress" | "ai";

const routes: Record<DashboardTab, string> = {
  matches: "/discover",
  opportunities: "/opportunities",
  rewards: "/rewards",
  progress: "/tasks",
  ai: "/ai-lab",
};

export function MentorMatchApp({ initialTab = "matches" }: { initialTab?: DashboardTab }) {
  const [tab, setTab] = useState<DashboardTab>(initialTab);
  const [role, setRole] = useState("Student");
  const [q, setQ] = useState("");
  const [careerFocus, setCareerFocus] = useState("Software Engineering");
  const [helpWith, setHelpWith] = useState(["Technical growth"]);
  const [formName, setFormName] = useState("Bakarr Kanu");
  const [formEmail, setFormEmail] = useState("");
  const [formNote, setFormNote] = useState("");
  const [status, setStatus] = useState("");
  const [msgs, setMsgs] = useState([
    "Hey! How are you doing? I’m Mentor Command. Talk with me normally, ask about today’s Atlanta weather, or get help with careers, tech, matches, points, and interviews.",
  ]);
  const [voice, setVoice] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [studentPoints, setStudentPoints] = useState(1275);
  const [mentorPoints, setMentorPoints] = useState(860);
  const [studentDone, setStudentDone] = useState([
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [mentorDone, setMentorDone] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [chatMode, setChatMode] = useState<"normal" | "min" | "max" | "closed">(
    "normal",
  );
  const [panel, setPanel] = useState<{
    title: string;
    kicker: string;
    body: string;
    action?: string;
    cost?: number;
  } | null>(null);
  const [notice, setNotice] = useState("");
  const [aiMode, setAiMode] = useState("SMART DEMO MODE");
  const [thinking, setThinking] = useState(false);
  const points = role === "Student" ? studentPoints : mentorPoints;
  const done = role === "Student" ? studentDone : mentorDone;
  function speak(text: string) {
    if (
      !voice ||
      typeof window === "undefined" ||
      !("speechSynthesis" in window)
    )
      return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.96;
    u.pitch = 0.88;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  }
  function toggleVoice() {
    const next = !voice;
    setVoice(next);
    if (next && typeof window !== "undefined") {
      const u = new SpeechSynthesisUtterance("Mentor Command voice activated.");
      u.onstart = () => setSpeaking(true);
      u.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(u);
    }
  }
  function finishTask(i: number, value: number) {
    if (done[i]) return;
    if (role === "Student") {
      setStudentDone((x) => x.map((v, n) => (n === i ? true : v)));
      setStudentPoints((p) => p + value);
    } else {
      setMentorDone((x) => x.map((v, n) => (n === i ? true : v)));
      setMentorPoints((p) => p + value);
    }
    setStatus(`Task completed. ${value} points were added to your ${role.toLowerCase()} balance.`);
    setTimeout(() => setStatus(""), 2600);
  }
  function confirmPanel() {
    if (!panel) return;
    if (panel.action !== "Run Agent" && !formEmail.includes("@")) {
      setNotice("Enter a valid email so the confirmation can be sent.");
      return;
    }
    if (panel.cost && points < panel.cost) {
      setNotice(
        `You need ${panel.cost - points} more points to unlock this reward.`,
      );
      return;
    }
    if (panel.cost) {
      role === "Student"
        ? setStudentPoints((p) => p - panel.cost!)
        : setMentorPoints((p) => p - panel.cost!);
    }
    const message =
      panel.action === "Connect"
        ? `Connection request sent for ${formName || "your profile"}.`
        : panel.action === "Run Agent"
          ? "Agent completed the analysis and added its recommendation to your dashboard."
          : panel.action === "Check Eligibility"
            ? "Eligibility check complete. Your next requirement is now listed under Tasks & Points."
            : "Reward request submitted successfully.";
    setNotice(message);
    setStatus(message);
    setTimeout(() => {
      setPanel(null);
      setNotice("");
      setFormNote("");
    }, 1800);
    setTimeout(() => setStatus(""), 3200);
  }
  async function ask(prompt?: string) {
    const text = (prompt || q).trim();
    if (!text) return;
    setQ("");
    setMsgs((m) => [...m, `You: ${text}`]);
    setThinking(true);
    try {
      const r = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, role, points, history: msgs }),
      });
      const d = await r.json();
      setMsgs((m) => [...m, d.answer]);
      if (d.answer?.length > 650) setChatMode("max");
      setAiMode(d.mode || "GUIDED CONVERSATION");
      speak(d.answer);
    } catch {
      setMsgs((m) => [...m, "I lost the connection for a moment. Please ask me again."]);
    } finally { setThinking(false); }
  }
  return (
    <main>
      <header>
        <div className="brand">
          <span>PS</span>
          <div>
            <b>MENTOR MATCH</b>
            <small>PER SCHOLAS × CGI TALENT BRIDGE</small>
          </div>
        </div>
        <nav>
          {(Object.entries(routes) as [DashboardTab, string][]).map(([key, href]) => (
            <Link key={key} href={href} className={tab === key ? "active" : ""}>
              {key === "matches" ? "Discover" : key === "progress" ? "Tasks & Points" : key === "ai" ? "AI Lab" : key[0].toUpperCase() + key.slice(1)}
            </Link>
          ))}
        </nav>
        <i>BK</i>
      </header>
      <section className="hero">
        <div>
          <label>CAREER MOBILITY, POWERED BY PEOPLE</label>
          <h1>
            Find the mentor who can
            <br />
            <em>move your career forward.</em>
          </h1>
          <p>
            Meaningful matches. Measurable growth. Rewards that recognize
            everyone who shows up.
          </p>
        </div>
        <aside>
          <b>1,248</b>
          <span>active connections</span>
          <small>92% report career growth</small>
        </aside>
      </section>
      <section className="dashboardRail">
        <article>
          <span className="dashIcon">⚡</span>
          <div>
            <small>CURRENT LEVEL</small>
            <b>Career Builder</b>
            <em>Level 4</em>
          </div>
        </article>
        <article>
          <span className="dashIcon">◉</span>
          <div>
            <small>NEXT MILESTONE</small>
            <b>Conference Access</b>
            <em>{Math.max(0, 1500 - points)} points away</em>
          </div>
        </article>
        <article>
          <span className="dashIcon">↗</span>
          <div>
            <small>WEEKLY MOMENTUM</small>
            <b>4-day streak</b>
            <em>+18% this week</em>
          </div>
        </article>
        <article className="mission">
          <span className="dashIcon">✦</span>
          <div>
            <small>AI RECOMMENDATION</small>
            <b>
              {role === "Student"
                ? "Finish your mock interview"
                : "Review a student portfolio"}
            </b>
            <button onClick={() => setTab("progress")}>
              View next action →
            </button>
          </div>
        </article>
      </section>
      <section className="app">
        <aside className="filters">
          <label>I AM A</label>
          <div className="toggle">
            <button
              className={role === "Student" ? "on" : ""}
              onClick={() => setRole("Student")}
            >
              Student
            </button>
            <button
              className={role === "Mentor" ? "on" : ""}
              onClick={() => setRole("Mentor")}
            >
              Mentor
            </button>
          </div>
          <label>MY CAREER FOCUS</label>
          <select aria-label="Career focus" value={careerFocus} onChange={(e) => setCareerFocus(e.target.value)}>
            <option>Software Engineering</option>
            <option>Cloud Computing</option>
            <option>Cybersecurity</option>
            <option>IT Support</option>
          </select>
          <label>I WANT HELP WITH</label>
          <div className="chips">
            {["Technical growth", "Interview prep", "Networking"].map((item) => <button type="button" className={helpWith.includes(item) ? "selected" : ""} aria-pressed={helpWith.includes(item)} key={item} onClick={() => setHelpWith((current) => current.includes(item) ? current.filter((x) => x !== item) : [...current, item])}>{item}</button>)}
          </div>
          <button className="primary" onClick={() => { setTab("matches"); setStatus(`Matches refreshed for ${careerFocus}${helpWith.length ? ` · ${helpWith.join(", ")}` : ""}.`); setTimeout(() => setStatus(""), 2600); }}>
            Find my matches →
          </button>
          <div className="points">
            <small>YOUR IMPACT POINTS</small>
            <b>{points.toLocaleString()}</b>
            <p>{Math.max(0, 1500 - points)} points to Conference Access</p>
            <i>
              <u style={{ width: `${Math.min(100, points / 15)}%` }} />
            </i>
          </div>
        </aside>
        <section className="content">
          {tab === "matches" && (
            <>
              <label>
                {role === "Student"
                  ? "MENTORS PERSONALIZED FOR YOU"
                  : "STUDENTS READY FOR GUIDANCE"}
              </label>
              <h2>
                {role === "Student"
                  ? "Your strongest mentor matches"
                  : "Mentees who match your expertise"}
              </h2>
              {people.map((p, i) => (
                <article className="mentor" key={p.name}>
                  <strong>0{i + 1}</strong>
                  <span className="avatar">{p.initials}</span>
                  <div>
                    <b className="score">{p.score}% MATCH</b>
                    <h3>{p.name}</h3>
                    <p>{p.role}</p>
                    <small>{p.skills}</small>
                    <footer>
                      <span>Available for introductions</span>
                      <button onClick={() => setPanel({title:p.name,kicker:`${p.score}% COMPATIBILITY`,body:`${p.role}. Strong alignment in ${p.skills}. The first connection includes a guided 20-minute agenda and one shared 30-day goal.`,action:"Connect"})}>View connection →</button>
                    </footer>
                  </div>
                </article>
              ))}
            </>
          )}
          {tab === "opportunities" && (
            <>
              <label>UNLOCK WHAT COMES NEXT</label>
              <h2>{role} opportunities</h2>
              <div className="opportunityList">
                {opportunities.map((o, i) => (
                  <article key={o[0]}>
                    <span className="opIcon">
                      {["◎", "◇", "▣", "△", "★"][i]}
                    </span>
                    <div>
                      <small>{o[1]}</small>
                      <h3>{o[0]}</h3>
                      <p>{o[3]}</p>
                    </div>
                    <aside>
                      <b>{o[2]}</b>
                      <button onClick={() => setPanel({title:o[0],kicker:"OPPORTUNITY ELIGIBILITY",body:`${o[3]}. Required milestone: ${o[2]}. The system will compare your points and completed readiness tasks.`,action:"Check Eligibility"})}>Check eligibility</button>
                    </aside>
                  </article>
                ))}
              </div>
            </>
          )}
          {tab === "rewards" && (
            <>
              <label>RECOGNIZE {role.toUpperCase()} PARTICIPATION</label>
              <h2>{role} rewards marketplace</h2>
              <div className="rewardgrid">
                {rewards.map((r) => (
                  <article key={r[0]}>
                    <b>{r[1]} PTS</b>
                    <h3>{r[0]}</h3>
                    <p>{r[2]}</p>
                    <button onClick={() => setPanel({title:r[0],kicker:"REWARD DETAILS",body:`${r[2]}. Your current balance is ${points.toLocaleString()} points.`,action:"Redeem",cost:Number(r[1].replace(",",""))})}>View and redeem</button>
                  </article>
                ))}
              </div>
            </>
          )}
          {tab === "progress" && (
            <>
              <label>{role.toUpperCase()} MISSION LOG</label>
              <h2>{role} tasks turn into points</h2>
              <div className="stats">
                <article>
                  <b>{points.toLocaleString()}</b>
                  <span>points earned</span>
                </article>
                <article>
                  <b>{done.filter(Boolean).length}</b>
                  <span>tasks completed</span>
                </article>
                <article>
                  <b>{role === "Student" ? 3 : 2}</b>
                  <span>rewards unlocked</span>
                </article>
              </div>
              <div className="progressTrack">
                <span>
                  <b>{points.toLocaleString()}</b> / 1,500 points
                </span>
                <i>
                  <u style={{ width: `${Math.min(100, points / 15)}%` }} />
                </i>
                <small>
                  {points >= 1500
                    ? "Conference Access unlocked!"
                    : `${1500 - points} points until Conference Access`}
                </small>
              </div>
              <h3>Complete a {role.toLowerCase()} task to earn points</h3>
              <div className="taskGrid">
                {(role === "Student" ? studentTasks : mentorTasks).map(
                  (x, i) => (
                    <button
                      className="activity taskButton"
                      key={x[0]}
                      onClick={() => finishTask(i, x[2] as number)}
                      disabled={done[i]}
                    >
                      <span className={done[i] ? "check done" : "check"}>
                        {done[i] ? "✓" : ""}
                      </span>
                      <div>
                        <b>{x[0]}</b>
                        <small>
                          {done[i] ? "Completed — points added" : x[1]}
                        </small>
                      </div>
                      <strong>{done[i] ? "EARNED" : `+${x[2]} pts`}</strong>
                    </button>
                  ),
                )}
              </div>
            </>
          )}
          {tab === "ai" && (
            <>
              <label>RENDER ATL-INSPIRED AGENT WORKFLOW</label>
              <h2>Mentor Match AI Lab</h2>
              <p className="labIntro">
                A hybrid conversational agent using chat memory, verified
                program context, structured career workflows, and optional
                OpenAI web search. Document-based RAG is the next planned layer.
              </p>
              <div className="architectureStatus">
                <button onClick={() => setPanel({title:"Conversational Agent",kicker:"ACTIVE NOW",body:"Maintains recent chat context, understands follow-up answers, and guides users through interviews, meetings, tasks, and opportunities.",action:"Run Agent"})}><b>ACTIVE</b><span>Conversation memory</span><small>Follow-up aware</small></button>
                <button onClick={() => setPanel({title:"Program Knowledge",kicker:"ACTIVE NOW",body:"Uses verified Mentor Match tasks, point values, rewards, roles, and opportunity rules supplied by the application.",action:"Run Agent"})}><b>ACTIVE</b><span>Program knowledge</span><small>Structured context</small></button>
                <button onClick={() => setPanel({title:"OpenAI + Web",kicker:"AVAILABLE WHEN CONNECTED",body:"When an OpenAI API key is configured, Mentor Command can generate broader answers and search the live web for current information.",action:"Run Agent"})}><b>READY</b><span>OpenAI + live web</span><small>API connection</small></button>
                <button onClick={() => setPanel({title:"Document RAG",kicker:"NEXT BUILD PHASE",body:"True RAG will let users upload résumés, rubrics, job descriptions, and program documents. The system will chunk, embed, retrieve, and cite the most relevant source passages before answering.",action:"Run Agent"})}><b>PLANNED</b><span>Document RAG</span><small>Retrieval + citations</small></button>
              </div>
              <div className="agentFlow">
                {aiAgents.map((a, i) => (
                  <button className="agentCard" onClick={() => setPanel({title:a[0],kicker:i===5?"QUALITY CONTROL":"SPECIALIZED AI AGENT",body:`${a[1]}. This demonstration analyzes the current ${role.toLowerCase()} profile, task history, goals, and available opportunities.`,action:"Run Agent"})} key={a[0]}>
                    <span>0{i + 1}</span>
                    <div>
                      <h3>{a[0]}</h3>
                      <p>{a[1]}</p>
                    </div>
                    <b>{i === 5 ? "REVIEW OUTPUT" : "RUN AGENT →"}</b>
                  </button>
                ))}
              </div>
              <div className="aiPrinciples">
                <span>RAG-READY</span>
                <span>AI CHECKS AI</span>
                <span>OBSERVABLE</span>
                <span>LEAST PRIVILEGE</span>
                <span>HUMAN IN LOOP</span>
                <span>AWS READY</span>
              </div>
            </>
          )}
        </section>
      </section>
      {status && <div className="statusToast" role="status">✓ {status}</div>}
      {panel && <div className="panelBackdrop" onClick={()=>setPanel(null)}><section className="actionPanel" role="dialog" aria-modal="true" aria-label={panel.title} onClick={e=>e.stopPropagation()}><button className="panelClose" aria-label="Close" onClick={()=>setPanel(null)}>×</button><small>{panel.kicker}</small><h2>{panel.title}</h2><p>{panel.body}</p><div className="actionForm">{panel.action !== "Run Agent" && <><label>Your name<input value={formName} onChange={(e)=>setFormName(e.target.value)} placeholder="Full name" /></label><label>Email for confirmation<input value={formEmail} onChange={(e)=>setFormEmail(e.target.value)} type="email" placeholder="you@example.com" /></label></>}<label>{panel.action === "Run Agent" ? "What should the AI focus on?" : panel.action === "Connect" ? "What would you like help with?" : "Anything we should know?"}<textarea value={formNote} onChange={(e)=>setFormNote(e.target.value)} placeholder={panel.action === "Run Agent" ? "Example: Find my strongest mentor match" : "Add goals, availability, accessibility needs, or questions"} /></label></div>{notice&&<div className="panelNotice">{notice.startsWith("Enter") ? "!" : "✓"} {notice}</div>}<div className="panelActions"><button onClick={()=>setPanel(null)}>Cancel</button><button onClick={confirmPanel}>{panel.action}{panel.cost?` · ${panel.cost.toLocaleString()} pts`:""}</button></div></section></div>}
      {chatMode === "closed" ? (
        <button className="chatLauncher" onClick={() => setChatMode("normal")}>
          <span>✦</span> OPEN MENTOR COMMAND
        </button>
      ) : (
        <section className={`chat ${speaking ? "speaking" : ""} ${chatMode}`}>
          <div className="consoleTop">
            <div className="holoFace">
              <span className="eye left" />
              <span className="eye right" />
              <span className="nose" />
              <span className="mouth" />
            </div>
            <div>
              <b>MENTOR COMMAND</b>
              <small>HYBRID CONVERSATIONAL AGENT</small>
            </div>
            <div className="windowControls">
              <button
                aria-label="Minimize chat"
                onClick={() =>
                  setChatMode(chatMode === "min" ? "normal" : "min")
                }
              >
                —
              </button>
              <button
                aria-label="Maximize chat"
                onClick={() =>
                  setChatMode(chatMode === "max" ? "normal" : "max")
                }
              >
                □
              </button>
              <button
                aria-label="Close chat"
                onClick={() => setChatMode("closed")}
              >
                ×
              </button>
            </div>
          </div>
          {chatMode !== "min" && (
            <>
              <div className="energy">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="voiceRow">
                <button
                  className={voice ? "voice on" : "voice"}
                  onClick={toggleVoice}
                >
                  {voice ? "🔊 VOICE ON" : "🔇 ENABLE VOICE"}
                </button>
                <small>{aiMode} · remembers this conversation</small>
              </div>
              <div className="messages">
                {msgs.slice(chatMode === "max" ? -8 : -3).map((m, i) => (
                  <p key={i}>{m}</p>
                ))}
                {thinking && <p className="thinking">Mentor Command is thinking<span>...</span></p>}
              </div>
              <div className="quick">
                <button onClick={() => ask("Who is my best mentor match?")}>
                  BEST MATCH
                </button>
                <button onClick={() => ask("How do I earn points?")}>
                  EARN POINTS
                </button>
                <button onClick={() => ask(`Show ${role.toLowerCase()} tasks`)}>
                  MY TASKS
                </button>
                <button onClick={() => ask("What opportunities can I unlock?")}>
                  OPPORTUNITIES
                </button>
                <button onClick={() => ask("Create my first meeting agenda")}>
                  MEETING AGENDA
                </button>
                <button
                  onClick={() => ask("How do I prepare for an interview?")}
                >
                  INTERVIEW PREP
                </button>
                <button onClick={() => ask("What’s today’s weather in Atlanta?")}>ATLANTA WEATHER</button>
                <button onClick={() => ask("What kind of AI agent are you? Are you a RAG agent?")}>HOW THIS AI WORKS</button>
              </div>
              <footer>
                <input
                  aria-label="Ask Mentor Command"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && ask()}
                  placeholder="Ask me anything..."
                />
                <button aria-label="Send message" onClick={() => ask()}>
                  ➤
                </button>
              </footer>
            </>
          )}
        </section>
      )}
    </main>
  );
}

export default function Home() {
  return <MentorMatchApp />;
}
