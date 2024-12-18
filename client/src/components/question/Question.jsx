import React from "react";

const sampleData = [
  { id: 1, title: "Card Title 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 2, title: "Card Title 2", content: "Proin ac libero nec arcu placerat ultricies." },
  { id: 3, title: "Card Title 3", content: "Suspendisse potenti. Curabitur tincidunt tincidunt erat." },
  { id: 4, title: "Card Title 4", content: "Aenean vel lectus eget urna congue varius." },
  { id: 5, title: "Card Title 5", content: "Ut consequat odio vitae ligula ultricies, a interdum justo aliquet." },
  { id: 6, title: "Card Title 6", content: "Integer sagittis neque a neque efficitur, sit amet varius purus posuere." },
  { id: 7, title: "Card Title 7", content: "Fusce vitae sapien ut turpis consequat faucibus." },
  { id: 8, title: "Card Title 8", content: "Pellentesque habitant morbi tristique senectus et netus." },
  { id: 9, title: "Card Title 9", content: "Sed at nisi eu urna malesuada sodales." },
];

const Question = ({ question, options }) => {
  return (
    <div className="w-[80%] mx-auto bg-white border-2 border-gray-400 shadow-md rounded-lg p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-2">{question}</h2>
      <div className="flex flex-col gap-2">
        {options.map((option, index) => (
          <button
            key={index}
            className="bg-gray-100 w-[300px] text-left text-black-700 py-2 px-4 rounded hover:bg-gray-200 transition-colors duration-300"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

const Material = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Material Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ width: '80%', margin: '0 auto' }}>
        {sampleData.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-4">{item.content}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Question
          question="What is the capital of France?"
          options={["Paris", "London", "Berlin", "Madrid"]}
        />
      </div>
    </div>
  );
};

export default Material;
