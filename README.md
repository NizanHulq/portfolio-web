# Nizan's Portfolio Website

A modern, dynamic portfolio website built with Next.js, featuring AI-powered chatbot integration and database-driven content management.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)
![Groq](https://img.shields.io/badge/Groq-AI-FF6B35)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)

## ✨ Features

- **Dynamic Content** - Projects, experiences, and skills fetched from Supabase database
- **AI Chatbot** - Powered by Groq API with portfolio-aware context
- **Web2/Web3 Project Tabs** - Filter projects by category
- **Dark/Light Mode** - Theme toggle with smooth transitions
- **Responsive Design** - Mobile-first layout with Tailwind CSS
- **Animations** - Smooth interactions with Framer Motion

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14, React 18 |
| Database | Supabase (PostgreSQL) |
| AI | Groq API (LLaMA 3.3 70B) |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 11 |
| Deployment | Vercel |

## 📁 Project Structure

```
src/
├── components/
│   ├── AIChatbot.js      # Floating AI chat widget
│   ├── Experience.js     # Timeline component
│   ├── Skills.js         # Animated skills display
│   └── Navbar.js         # Navigation with AI button
├── lib/
│   ├── supabase.js       # Database client & helpers
│   └── groq.js           # AI context builder
├── pages/
│   ├── api/chat.js       # AI chat endpoint
│   ├── about.js          # About page with SSR
│   ├── projects.js       # Projects with category filter
│   └── contact.js        # Contact form → WhatsApp
└── data/
    ├── backup/           # JSON backups
    ├── supabase_schema.sql
    └── ai_context_schema.sql
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nizanhulq/portfolio-web.git
   cd portfolio-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run `src/data/supabase_schema.sql` in SQL Editor
   - Run `src/data/ai_context_schema.sql` in SQL Editor

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-supabase-anon-key
   GROQ_API_KEY=your-groq-api-key
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## 🗄️ Database Schema

### Tables

| Table | Description |
|-------|-------------|
| `projects` | Portfolio projects with Web2/Web3 category |
| `experiences` | Work experience timeline |
| `skills` | Skills with position data for animated display |
| `settings` | CV link, WhatsApp number, etc. |
| `ai_context` | AI chatbot personality & behavior config |

## 🤖 AI Chatbot

The portfolio features an AI assistant that:
- Knows about projects, skills, and experience from database
- Responds in English or Indonesian
- Guides visitors to relevant portfolio sections
- Uses 5-minute context caching for efficiency

**Model**: LLaMA 3.3 70B via Groq (free tier: 14,400 requests/day)

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
   - `GROQ_API_KEY` (mark as sensitive)
4. Deploy!

## 📝 Customization

### Update Portfolio Content
1. Edit data directly in Supabase dashboard
2. Changes reflect immediately (AI context refreshes every 5 min)

### Add New Skills
```sql
INSERT INTO skills (name, category, x_position, y_position) 
VALUES ('Rust', 'backend', '-25vw', '15vw');
```

### Modify AI Behavior
Update values in `ai_context` table under `behavior` category.

## 📄 License

This project is open source under the MIT License.

---

Built with ❤️ by [Nizan Dhiaulhaq](https://github.com/nizanhulq)