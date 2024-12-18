import React from "react";
import { Link } from "react-router-dom";

const StudyMaterial = () => {
  const cards = [
    { id: 1, title: "Quantitative Aptitude", route: "/quant" },
    { id: 2, title: "Logical Reasoning", route: "/logical" },
    { id: 3, title: "Coding", route: "/coding" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Study Material</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ width: "80%", margin: "0 auto" }}>
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
            <Link
              to={`/study-material${card.route}`}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Explore {card.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterial;
