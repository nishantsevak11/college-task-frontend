import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Calendar } from 'lucide-react';

const DashboardPreview = () => {
  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Main Dashboard Container */}
      <motion.div
        initial={{ opacity: 0, rotateX: 15 }}
        animate={{ opacity: 1, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        style={{ perspective: '1000px' }}
      >
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-syne font-bold text-white mb-2">Task Analytics</h3>
            <p className="text-gray-400 font-inter">Real-time insights</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-75"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sales Statistics Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 col-span-1 md:col-span-2"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-syne font-semibold text-white">Task Statistics</h4>
              <BarChart3 className="h-5 w-5 text-neon-green" />
            </div>
            
            {/* Animated Bar Chart */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-inter text-sm">Completed</span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="h-2 bg-gradient-to-r from-neon-green to-emerald-400 rounded-full ml-4 flex-1"
                />
                <span className="text-neon-green font-inter font-semibold text-sm ml-2">2,025</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-inter text-sm">In Progress</span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '45%' }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="h-2 bg-gradient-to-r from-neon-purple to-violet-400 rounded-full ml-4 flex-1"
                />
                <span className="text-neon-purple font-inter font-semibold text-sm ml-2">892</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-inter text-sm">Pending</span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '25%' }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                  className="h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full ml-4 flex-1"
                />
                <span className="text-yellow-400 font-inter font-semibold text-sm ml-2">324</span>
              </div>
            </div>
          </motion.div>

          {/* Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-gradient-to-br from-neon-green/20 to-emerald-400/10 backdrop-blur-xl rounded-2xl p-6 border border-neon-green/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-syne font-semibold text-white">Efficiency</h4>
              <TrendingUp className="h-5 w-5 text-neon-green" />
            </div>
            
            {/* Radial Progress */}
            <div className="relative flex items-center justify-center mb-4">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="rgba(52, 211, 153, 0.1)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="#34D399"
                  strokeWidth="8"
                  fill="transparent"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 226" }}
                  animate={{ strokeDasharray: "203 226" }}
                  transition={{ duration: 2, delay: 1 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-syne font-bold text-neon-green">89%</span>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-center"
            >
              <p className="text-gray-300 font-inter text-sm">+14% from last month</p>
            </motion.div>
          </motion.div>

          {/* Market Forecast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="bg-gradient-to-br from-neon-purple/20 to-violet-400/10 backdrop-blur-xl rounded-2xl p-6 border border-neon-purple/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-syne font-semibold text-white">Team Growth</h4>
              <Users className="h-5 w-5 text-neon-purple" />
            </div>
            
            <div className="text-3xl font-syne font-bold text-neon-purple mb-2">+25%</div>
            <p className="text-gray-300 font-inter text-sm mb-4">Active members</p>
            
            {/* Mini trend line */}
            <div className="h-16 relative">
              <svg className="w-full h-full">
                <motion.path
                  d="M0,50 Q30,20 60,30 T120,10"
                  stroke="#A78BFA"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1.2 }}
                />
              </svg>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 col-span-1 md:col-span-2"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-syne font-semibold text-white">Recent Activity</h4>
              <Calendar className="h-5 w-5 text-neon-blue" />
            </div>
            
            <div className="space-y-3">
              {[
                { user: "Alex", action: "completed task", time: "2m ago", color: "text-neon-green" },
                { user: "Sarah", action: "created project", time: "5m ago", color: "text-neon-purple" },
                { user: "Mike", action: "updated status", time: "8m ago", color: "text-neon-blue" },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${activity.color.replace('text-', 'bg-')}`} />
                    <span className="text-gray-300 font-inter text-sm">
                      <span className="text-white font-medium">{activity.user}</span> {activity.action}
                    </span>
                  </div>
                  <span className="text-gray-500 font-inter text-xs">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-neon-green to-emerald-400 rounded-2xl blur-xl opacity-60"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-neon-purple to-violet-400 rounded-full blur-xl opacity-40"
      />
    </div>
  );
};

export default DashboardPreview;