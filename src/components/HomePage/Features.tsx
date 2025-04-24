
import { List, Calendar, ArrowRight, Users } from "lucide-react";

const Features = () => {
  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-1/2">
            <div className="text-blue-600 mb-2">Smart Task Management</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Designed for modern teams and workflows
            </h2>
            <p className="text-gray-600 mb-8">
              Our intelligent task management system adapts to your team's needs, providing 
              powerful automation and seamless collaboration features.
            </p>
            
            <div className="mb-8">
              <p className="text-sm text-gray-700 mb-4">Explore our core features</p>
              <div className="flex flex-wrap gap-3">
                {[ 
                  'Team Collaboration', 
                  'Time Tracking', 
                  'Prioritization',
                  'Colloboration',
                ].map((feature) => (
                  <button 
                    key={feature} 
                    className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 flex items-center gap-2 hover:bg-gray-50"
                  >
                    <List className="h-4 w-4" />
                    {feature}
                    <ArrowRight className="h-3 w-3" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="bg-gray-900 rounded-lg shadow-lg p-4 overflow-hidden">
              <div className="flex items-center gap-2 mb-3 p-2 bg-red-800 rounded-md w-fit">
               
              </div>

              <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240427182308/How-to-Manage-Tasks.webp" alt="" />
              
              {/* <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                <code>
{`// Initialize TaskFlow client
const taskflow = new TaskFlow({
  apiKey: process.env.TASKFLOW_API_KEY
});

// Create a new task
const task = await taskflow.tasks.create({
  title: "Launch marketing campaign",
  assignee: "user_123",
  dueDate: "2025-05-01",
  priority: "high",
  labels: ["marketing", "Q2-goals"]
});

// Add automation rule
await taskflow.automations.create({
  trigger: "task.completed",
  action: "notify.team"
});`}
                </code>
              </pre> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
