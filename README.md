# CompanyBuddy - Task Management System

CompanyBuddy is a comprehensive task management application designed for teams to collaborate efficiently on projects with features like task tracking, team management, and real-time updates.

## 📖 Table of Contents
- [Features](#-key-features)
- [Technologies](#-technologies)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Key Features

- **Company & Team Management**
  - Create and manage multiple companies
  - Invite team members via email
  - Role-based permissions (Admin/Member)
  - View pending invitations

- **Task Management**
  - Create tasks with titles, descriptions, and due dates
  - Assign tasks to team members
  - Track task status (To Do, In Progress, Completed)
  - Set task priorities (High, Medium, Low)
  - Edit and delete tasks

- **Collaboration Tools**
  - Comment system for task discussions
  - Real-time activity feed
  - Notification system

- **User Experience**
  - Responsive design for all devices
  - Modern UI with TailwindCSS
  - Smooth animations and transitions
  - Intuitive navigation

## 🛠️ Technologies

### Frontend
- React 18 with TypeScript
- Vite for fast development
- React Router for navigation
- React Query for data fetching
- Shadcn/ui component library
- TailwindCSS for styling
- Lucide icons

### Backend (API)
- Custom API service layer
- JWT authentication
- Error handling

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- Git (for version control)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/company-buddy.git
   cd company-buddy
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (see [Environment Variables](#-environment-variables))
4. Start development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:5173 in your browser

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
VITE_API_BASE_URL=http://localhost:3000
VITE_JWT_SECRET=your-secret-key
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### Available Scripts
- `npm run dev`: Starts development server
- `npm run build`: Creates production build
- `npm run preview`: Previews production build locally
- `npm run lint`: Runs ESLint
- `npm run test`: Runs tests

## 📂 Project Structure

```
src/
├── components/       # Reusable components
│   ├── CommentSection.tsx  # Task comments
│   ├── Navbar.tsx          # Main navigation
│   ├── NewTaskForm.tsx     # Task creation form
│   ├── TaskCard.tsx        # Individual task display
│   └── ui/                # UI components
├── context/          # Application contexts
│   └── AuthContext.tsx     # Authentication
├── hooks/           # Custom hooks
├── pages/           # Page components
│   ├── Company.tsx        # Company dashboard
│   ├── Dashboard.tsx      # User dashboard
│   └── ...
├── services/        # API services
│   └── api.ts            # API client
└── types/           # TypeScript types
```

## 🔌 API Reference

### Authentication
- `POST /auth/login`: User login
- `POST /auth/register`: User registration
- `POST /auth/refresh`: Refresh token

### Companies
- `GET /companies`: List all companies
- `POST /companies`: Create new company
- `GET /companies/:id`: Get company details

### Tasks
- `GET /tasks`: List all tasks
- `POST /tasks`: Create new task
- `PUT /tasks/:id`: Update task
- `DELETE /tasks/:id`: Delete task

## 🧪 Testing

Run tests with:
```bash
npm run test
```

Test coverage report:
```bash
npm run test:coverage
```

## 🚀 Deployment

### Vercel
1. Install Vercel CLI:
```bash
npm install -g vercel
```
2. Deploy:
```bash
vercel
```

### Netlify
1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```
2. Deploy:
```bash
netlify deploy
```

## 🛠️ Troubleshooting

### Common Issues
- **Port already in use**: Try changing the port in `.env`
- **Missing environment variables**: Ensure `.env` file exists
- **Dependency issues**: Delete `node_modules` and run `npm install`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📜 License

MIT License

```
src/
├── components/       # Reusable components
│   ├── CommentSection.tsx  # Task comments
│   ├── Navbar.tsx          # Main navigation
│   ├── NewTaskForm.tsx     # Task creation form
│   ├── TaskCard.tsx        # Individual task display
│   └── ui/                # UI components
├── context/          # Application contexts
│   └── AuthContext.tsx     # Authentication
├── hooks/           # Custom hooks
├── pages/           # Page components
│   ├── Company.tsx        # Company dashboard
│   ├── Dashboard.tsx      # User dashboard
│   └── ...
├── services/        # API services
│   └── api.ts            # API client
└── types/           # TypeScript types
```

## 📝 Usage Guide

### Creating a Company
1. Navigate to Dashboard
2. Click "Create Company"
3. Enter company details
4. Invite team members

### Managing Tasks
1. Open a company
2. Click "New Task"
3. Fill task details
4. Assign to team member
5. Track progress via status updates

### Team Collaboration
- Comment on tasks
- View recent activity
- Manage team members

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📜 License

MIT License
