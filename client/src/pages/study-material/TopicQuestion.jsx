import React from "react";
import { useParams } from "react-router-dom";

const TopicQuestion = () => {
  const { topic } = useParams();

  const questions = [
    { id: 1, question: `Sample question 1 for ${topic}`, options: ["Option 1", "Option 2", "Option 3", "Option 4"] },
    { id: 2, question: `Sample question 2 for ${topic}`, options: ["Option 1", "Option 2", "Option 3", "Option 4"] },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">{topic.replace("-", " ").toUpperCase()}</h1>
      <div className="grid gap-6" style={{ width: "80%", margin: "0 auto" }}>
        {questions.map((q) => (
          <div
            key={q.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-lg font-semibold mb-4">{q.question}</h2>
            {q.options.map((option, index) => (
              <button
                key={index}
                className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded mb-2 hover:bg-gray-200 transition-colors duration-300"
              >
                {option}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicQuestion;
