import React from "react";
import { Link } from "react-router-dom";

const Quant = () => {
  const topics = ["Algebra", "Geometry", "Probability", "Statistics", "Number Systems"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Quantitative Aptitude Topics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ width: "80%", margin: "0 auto" }}>
        {topics.map((topic, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-4">{topic}</h2>
            <Link
              to={`/study-material/quant/${topic.toLowerCase().replace(" ", "-")}`}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              View {topic}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quant;
