
import React from 'react';

const CodeExample = ({ step, title, content, image }) => {
  return (
    <section className="py-20 px-6 md:px-12 bg-white border-t border-gray-100">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                {step}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              {content}
            </p>

          </div>

          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gray-50 p-2 flex items-center justify-between border-b">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">←</button>
                  <button className="text-gray-400 hover:text-gray-600">→</button>
                  <button className="text-gray-400 hover:text-gray-600">⋯</button>
                </div>
              </div>

              <img src={image} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeExample;
