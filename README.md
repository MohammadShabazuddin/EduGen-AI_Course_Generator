# AI Course Generator 🚀

A Full Stack AI-powered application for generating online courses, built using **Next.js**, **React**, **Node.js**, and **TailwindCSS**. This project leverages the **Gemini API** for AI-based course content generation, **Clerk** for user authentication, and **Drizzle ORM** with **PostgreSQL** for database management. 

## Key Features 📝
- **AI-Powered Course Generation**: Automatically generate course layouts, including chapters and descriptions, using the **Gemini API**.
- **User Authentication**: Secure login and sign-up with **Clerk**, including Google Sign-In integration.
- **Course Customization**: Edit course titles, descriptions, chapters, and upload banner images.
- **Video Integration**: Generate videos for each course chapter using the **YouTube API**.
- **Shareable URL**: Each generated course comes with a unique, shareable URL that doesn’t require user authentication to view.
- **Database Management**: **Drizzle ORM** with **PostgreSQL** is used to store course data.
- **Image Storage**: Course banners are stored using **Firebase**.
- **Responsive UI**: Designed with **TailwindCSS** and enhanced using components from **ShadCN** for a clean and responsive user interface.
- **Free & Upgradeable**: Users can generate up to five courses for free, with an option to upgrade for unlimited course creation.

## Technologies Used 🛠️
- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Node.js, Gemini API, Drizzle ORM, PostgreSQL
- **Authentication**: Clerk (Google Sign-In, Email/Password)
- **Image Storage**: Firebase
- **Video Generation**: YouTube API
- **Deployment**: Vercel

## Getting Started ⚡

### Prerequisites
Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/ai-course-generator.git
   cd ai-course-generator ```
   
2. **Install dependencies:** <br>
   ```npm install```

3. **Set up environment variables:** <br>

Create a .env.local file and add your API keys and environment configurations: <br>

  NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key <br>
  NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api <br>
  NEXT_PUBLIC_YOUTUBE_API_KEY=your-youtube-api-key <br>
  DATABASE_URL=your-postgresql-url <br>
  FIREBASE_API_KEY=your-firebase-api-key <br>

4. **Run the development server:** <br>
npm run dev <br>
Open http://localhost:3000 to view the app. <br>

5. **Deployment** <br>
This project is deployed via Vercel. For deploying your own version, follow these steps:
Push your code to GitHub.
Connect your GitHub repository to Vercel.
Set your environment variables on Vercel.
Deploy the app with a single click!
<br>









   
   
