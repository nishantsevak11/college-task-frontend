
const CTA = () => {
  return (
    <section className="bg-blue-50 text-gray-800 py-16 px-6 md:px-12">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <div className="flex items-center justify-center bg-white rounded-lg p-4 h-full">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                4
              </div>
              
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">Task Analytics</h3>
                <p className="text-gray-600 text-sm">
                  Get detailed insights into your team's performance and project progress with advanced analytics
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-4 overflow-hidden">
              <div className="flex items-center justify-between p-2 border-b">
                <div className="flex items-center">
                  <span className="text-sm font-medium">Project Overview</span>
                  <span className="ml-2 text-xs text-gray-500">Last 30 days</span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold">Task Completion Rate</h3>
                <div className="mt-4 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-blue-600 rounded-full"></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">75% of tasks completed on time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
