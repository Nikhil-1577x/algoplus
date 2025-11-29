# 🚀 Algoplus - LeetCode Tracker & Competitive Battle Arena

<div align="center">

![Algoplus Banner](https://img.shields.io/badge/Algoplus-LeetCode%20Tracker-06B6D4?style=for-the-badge&logo=leetcode&logoColor=white)

**Track. Compete. Dominate.**

A full-stack MERN application that transforms LeetCode practice into a competitive experience with real-time battles, AI-powered recommendations, and comprehensive progress tracking.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://your-deployment-url.com)
[![GitHub](https://img.shields.io/badge/GitHub-Nikhil--1577x-181717?style=for-the-badge&logo=github)](https://github.com/Nikhil-1577x)

</div>

---

## ✨ Features

### 📊 **Smart Progress Tracking**
- **Real-time LeetCode Sync** - Fetch your latest stats instantly using LeetCode's GraphQL API
- **Difficulty Breakdown** - Visual analytics for Easy, Medium, and Hard problems
- **Blind 75 Progress** - Track your progress on the legendary Blind 75 problem set
- **Active Days Counter** - Monitor your consistency and streaks

### 🤖 **AI-Powered Recommendations**
- **GPT-4 Integration** - Get personalized problem recommendations based on your solving patterns
- **Smart Topic Analysis** - AI identifies your weak areas and suggests targeted practice
- **Contextual Suggestions** - Recommendations adapt to your current skill level

### ⚔️ **Ghost Mode - Battle Arena** 🔥
> **The Resume Flex Feature**

Race against recorded runs from legendary competitive programmers in real-time!

- **1v1 Battles** - Compete against neal_wu, tourist, and other coding legends
- **Live Progress Tracking** - Real-time opponent progress bar and timer
- **Monaco Editor Integration** - Professional code editor with syntax highlighting
- **Leaderboard System** - Top 10 fastest times for every problem
- **Anti-Cheat Verification** - Validated with LeetCode's official submission timestamps

### 🎨 **Premium UI/UX**
- **Midnight Glass Theme** - Dark mode with glassmorphism effects
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Custom Scrollbars** - Polished details throughout

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations
- **Monaco Editor** - VS Code-powered code editor
- **Tailwind CSS** - Utility-first styling
- **Lucide Icons** - Beautiful icon library

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### **APIs & Services**
- **LeetCode GraphQL API** - User stats and problem data
- **OpenAI GPT-4** - AI recommendations
- **MongoDB Atlas** - Cloud database hosting

---

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (free tier)
- OpenAI API key

### 1. Clone the Repository
```bash
git clone https://github.com/Nikhil-1577x/algoplus.git
cd algoplus
```

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
cd ..
```

### 3. Environment Variables

**Frontend `.env`:**
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

**Backend `server/.env`:**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
```

### 4. Run the Application

**Development Mode (runs both frontend & backend):**
```bash
npm run dev
```

**Or run separately:**

Frontend:
```bash
npm run dev
```

Backend:
```bash
cd server
npm run dev
```

The app will be available at:
- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:5000`

---

## 🎯 Usage

### 1. **Track Your Progress**
- Enter your LeetCode username on the Dashboard
- Click "SYNC" to fetch your latest stats
- View your progress across all difficulty levels and topics

### 2. **Get AI Recommendations**
- After syncing, the AI will analyze your solving patterns
- Receive personalized problem suggestions
- Focus on topics that need improvement

### 3. **Enter Ghost Mode**
- Click the "Ghost Mode" button after syncing
- Choose a problem to battle
- Race against legendary coders' recorded times
- Submit your solution and see if you won!

---

## 📁 Project Structure

```
algoplus/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── AnimatedBackground.jsx
│   │       └── Navbar.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── Dashboard.jsx
│   │   └── GhostMode.jsx
│   ├── services/
│   │   ├── leetcode.js       # LeetCode API integration
│   │   ├── openai.js          # OpenAI API integration
│   │   └── api.js             # Backend API calls
│   ├── data/
│   │   └── blind75.js         # Blind 75 problem list
│   ├── App.jsx
│   └── main.jsx
├── server/
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── BattleRun.js       # Ghost Mode run schema
│   ├── index.js               # Express server & routes
│   └── .env
├── index.css                  # Global styles
├── tailwind.config.js
└── package.json
```

---

## 🚀 Future Enhancements

### 🔥 High Priority
- [ ] **User Authentication** - Supabase/Firebase Auth integration
- [ ] **Real-time Multiplayer** - WebSocket integration for live 1v1 battles
- [ ] **Replay System** - Watch and analyze past Ghost Mode battles
- [ ] **Global Leaderboards** - Rank across all problems and users
- [ ] **Problem Recommendations Engine** - ML-based personalized suggestions

### 🎨 UI/UX Improvements
- [ ] **Dark/Light Mode Toggle** - User preference support
- [ ] **Custom Themes** - Multiple color schemes
- [ ] **Achievement Badges** - Gamification elements
- [ ] **Progress Charts** - Recharts integration for visual analytics
- [ ] **Animated Transitions** - Page transitions and micro-interactions

### 📊 Analytics & Insights
- [ ] **Topic Heatmap** - Visual representation of strengths/weaknesses
- [ ] **Time Tracking** - Average time per problem difficulty
- [ ] **Submission History** - Calendar view of daily submissions
- [ ] **Company Tags Filter** - Filter problems by company (Google, Meta, etc.)

### ⚔️ Ghost Mode Enhancements
- [ ] **Custom Ghosts** - Upload your own runs
- [ ] **Tournament Mode** - Bracket-style competitions
- [ ] **Spectator Mode** - Watch live battles
- [ ] **Code Comparison** - Side-by-side solution analysis
- [ ] **Difficulty Ratings** - Community-driven problem difficulty

### 🔧 Technical Improvements
- [ ] **Redis Caching** - Faster API responses
- [ ] **Rate Limiting** - API protection
- [ ] **Error Monitoring** - Sentry integration
- [ ] **Unit Tests** - Jest + React Testing Library
- [ ] **CI/CD Pipeline** - GitHub Actions deployment
- [ ] **Docker Support** - Containerized deployment

### 🌐 Social Features
- [ ] **Friend System** - Add friends and compare progress
- [ ] **Discussion Forum** - Problem-specific discussions
- [ ] **Code Sharing** - Share solutions with the community
- [ ] **Study Groups** - Collaborative learning rooms

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **LeetCode** - For the amazing platform and API
- **OpenAI** - For GPT-4 API
- **Blind 75** - For the curated problem list
- **neal_wu, tourist** - Legendary competitive programmers

---

## 📧 Contact

**Nikhil** - [@Nikhil-1577x](https://github.com/Nikhil-1577x)

**Project Link:** [https://github.com/Nikhil-1577x/algoplus](https://github.com/Nikhil-1577x/algoplus)

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

Made with ❤️ and ☕ by [Nikhil](https://github.com/Nikhil-1577x)

</div>
