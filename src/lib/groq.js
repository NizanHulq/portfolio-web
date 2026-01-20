import { Groq } from 'groq-sdk';
import { getExperiences, getProjects, getSkills, getAllAIContext } from './supabase';

// Initialize Groq client with API key from environment
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Fallback context if database fetch fails
const FALLBACK_CONTEXT = `You are Nizan's AI assistant on his portfolio website. Your name is "Nizan's Assistant".

ABOUT NIZAN:
- Full Name: Nizan Dhiaulhaq
- Current Role: Backend Developer at PT Voltras International (Dec 2024 - Present)
- Location: Yogyakarta, Indonesia

SKILLS: Java, Spring Boot, PostgreSQL, Docker, Kubernetes, React.js, Next.js, Laravel

Be friendly, helpful, and guide visitors to relevant sections of the portfolio.`;

/**
 * Build the system prompt dynamically from database data
 */
async function buildPortfolioContext() {
  try {
    // Fetch all data in parallel
    const [experiences, projects, skills, aiContext] = await Promise.all([
      getExperiences(),
      getProjects(),
      getSkills(),
      getAllAIContext()
    ]);

    // Build about section
    const about = aiContext.about || {};
    const aboutSection = `
- Full Name: ${about.full_name || 'Nizan Dhiaulhaq'}
- Current Role: ${about.current_role || 'Backend Developer'}
- Start Date: ${about.start_date || 'Dec 2024'}
- Location: ${about.location || 'Yogyakarta, Indonesia'}
- Education: ${about.education || 'Universitas Gadjah Mada'}
${about.current_work_description ? `- Current Work: ${about.current_work_description}` : ''}`;

    // Build skills section from database
    const skillsByCategory = {};
    skills.forEach(skill => {
      const cat = skill.category || 'general';
      if (!skillsByCategory[cat]) skillsByCategory[cat] = [];
      skillsByCategory[cat].push(skill.name);
    });
    
    const skillsSection = Object.entries(skillsByCategory)
      .map(([category, skillList]) => `- ${category.charAt(0).toUpperCase() + category.slice(1)}: ${skillList.join(', ')}`)
      .join('\n');

    // Build experience section from database
    const experienceSection = experiences.slice(0, 4).map((exp, i) => 
      `${i + 1}. ${exp.position} at ${exp.company} (${exp.time_period})`
    ).join('\n');

    // Build projects section from database
    const projectsSection = `${projects.length}+ projects including:\n` + 
      projects.slice(0, 5).map(p => `- ${p.title}: ${p.type}`).join('\n');

    // Build personality section
    const personality = aiContext.personality || {};
    const personalitySection = Object.values(personality)
      .map(trait => `- ${trait}`)
      .join('\n');

    // Build behavior section
    const behavior = aiContext.behavior || {};
    const behaviorSection = Object.values(behavior)
      .map(rule => `- ${rule}`)
      .join('\n');

    // Get the template or use default
    const instructions = aiContext.instructions || {};
    const template = instructions.system_prompt_template || `You are {{assistant_name}} on Nizan's portfolio website.

ABOUT NIZAN:
{{about_section}}

SKILLS:
{{skills_section}}

EXPERIENCE:
{{experience_section}}

KEY PROJECTS:
{{projects_section}}

PERSONALITY:
{{personality_section}}

YOUR BEHAVIOR:
{{behavior_section}}`;

    // Replace placeholders
    const systemPrompt = template
      .replace('{{assistant_name}}', instructions.assistant_name || "Nizan's Assistant")
      .replace('{{about_section}}', aboutSection)
      .replace('{{skills_section}}', skillsSection)
      .replace('{{experience_section}}', experienceSection)
      .replace('{{projects_section}}', projectsSection)
      .replace('{{personality_section}}', personalitySection)
      .replace('{{behavior_section}}', behaviorSection);

    return systemPrompt;
  } catch (error) {
    console.error('Error building portfolio context:', error);
    return FALLBACK_CONTEXT;
  }
}

// Cache for the built context (refresh every 5 minutes)
let cachedContext = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getPortfolioContext() {
  const now = Date.now();
  if (!cachedContext || (now - cacheTimestamp) > CACHE_DURATION) {
    cachedContext = await buildPortfolioContext();
    cacheTimestamp = now;
  }
  return cachedContext;
}

/**
 * Create a chat completion with portfolio context from database
 * @param {Array} messages - Array of message objects with role and content
 * @param {boolean} stream - Whether to stream the response
 */
export async function createChatCompletion(messages, stream = false) {
  const portfolioContext = await getPortfolioContext();
  
  const systemMessage = {
    role: 'system',
    content: portfolioContext
  };

  const response = await groq.chat.completions.create({
    messages: [systemMessage, ...messages],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: stream,
  });

  return response;
}

/**
 * Get a simple non-streaming response
 */
export async function getChatResponse(messages) {
  const response = await createChatCompletion(messages, false);
  return response.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
}

/**
 * Force refresh the cached context (useful after database updates)
 */
export function refreshContextCache() {
  cachedContext = null;
  cacheTimestamp = 0;
}

export { groq };
