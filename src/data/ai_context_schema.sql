-- =============================================
-- AI CONTEXT MIGRATION - ADDITIONAL TABLES
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. Skills Table (for Skills component and AI context)
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) DEFAULT 'general', -- 'backend', 'frontend', 'database', 'devops', 'web3'
  x_position VARCHAR(20), -- e.g., '-12vw' for Skills component positioning
  y_position VARCHAR(20), -- e.g., '0vw'
  proficiency INTEGER DEFAULT 3, -- 1-5 scale for AI context
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. AI Context Configuration Table
CREATE TABLE ai_context (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'general', -- 'about', 'personality', 'behavior', 'instructions'
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- INSERT SKILLS DATA
-- =============================================
INSERT INTO skills (name, category, x_position, y_position, proficiency, order_index) VALUES
-- Inner ring (core skills)
('HTML', 'frontend', '-12vw', '0vw', 5, 1),
('JavaScript', 'frontend', '12vw', '0vw', 5, 2),
('PHP', 'backend', '0vw', '10vw', 4, 3),
('Tailwind', 'frontend', '0vw', '-10vw', 5, 4),
-- Middle ring
('Java', 'backend', '-18vw', '-12vw', 5, 5),
('Spring Boot', 'backend', '18vw', '-12vw', 5, 6),
('React Js', 'frontend', '-20vw', '8vw', 4, 7),
('Next Js', 'frontend', '20vw', '8vw', 4, 8),
('Laravel', 'backend', '0vw', '-18vw', 4, 9),
-- Outer ring
('PostgreSQL', 'database', '-12vw', '-22vw', 5, 10),
('Oracle', 'database', '12vw', '-22vw', 3, 11),
('Git', 'devops', '-32vw', '-5vw', 5, 12),
('Docker', 'devops', '32vw', '-5vw', 4, 13),
('Kubernetes', 'devops', '-28vw', '12vw', 3, 14),
('Grafana', 'devops', '28vw', '12vw', 3, 15),
('Solidity', 'web3', '0vw', '22vw', 3, 16);

-- =============================================
-- INSERT AI CONTEXT DATA
-- =============================================

-- About section
INSERT INTO ai_context (key, value, category) VALUES
('full_name', 'Nizan Dhiaulhaq', 'about'),
('current_role', 'Backend Developer at PT Voltras International', 'about'),
('start_date', 'Dec 2024', 'about'),
('location', 'Yogyakarta, Indonesia', 'about'),
('education', 'Universitas Gadjah Mada (UGM)', 'about'),
('current_work_description', 'Building scalable backend systems using Java, Spring Boot, and microservices architecture. Developed Airline Gateway Service integrating with Sabre GDS and other airline APIs. Working on B2B travel platform for airline booking ecosystem.', 'about');

-- Personality traits
INSERT INTO ai_context (key, value, category) VALUES
('personality_1', 'Passionate about clean code and solving backend challenges', 'personality'),
('personality_2', 'Enjoys both backend and full-stack development', 'personality'),
('personality_3', 'Has a sense of humor (mentions anime references)', 'personality'),
('personality_4', 'Not AI-generated (he promises 😄)', 'personality');

-- AI Behavior instructions
INSERT INTO ai_context (key, value, category) VALUES
('behavior_tone', 'Be friendly, helpful, and conversational', 'behavior'),
('behavior_length', 'Keep responses concise (2-3 sentences for simple questions)', 'behavior'),
('behavior_navigation', 'Guide visitors to relevant sections: /about, /projects, /contact', 'behavior'),
('behavior_contact', 'If asked about contacting Nizan, direct them to the contact page', 'behavior'),
('behavior_emoji', 'Use emojis sparingly to be engaging', 'behavior'),
('behavior_language', 'Answer in the same language the user uses (English/Indonesian)', 'behavior');

-- Main system prompt template (uses placeholders that get replaced dynamically)
INSERT INTO ai_context (key, value, category) VALUES
('system_prompt_template', 'You are Nizan''s AI assistant on his portfolio website. Your name is "Nizan''s Assistant".

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
{{behavior_section}}', 'instructions'),

('assistant_name', 'Nizan''s Assistant', 'instructions');

-- =============================================
-- ENABLE ROW LEVEL SECURITY
-- =============================================
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_context ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access on ai_context" ON ai_context FOR SELECT USING (true);
