import React from "react";
import { Link } from "react-router-dom";

const sampleData = [
  { id: 1, title: "User", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",href:"/admin/all-user" },
  { id: 2, title: "Quiz", content: "Proin ac libero nec arcu placerat ultricies." ,href:"/admin/all-quiz" },
  { id: 3, title: "Card Title 3", content: "Suspendisse potenti. Curabitur tincidunt tincidunt erat."  ,href:"/admin/all-user"},
  { id: 4, title: "Study Material", content: "Aenean vel lectus eget urna congue varius." ,href:"/admin/all-user" },
  { id: 5, title: "Job Request", content: "Ut consequat odio vitae ligula ultricies, a interdum justo aliquet." ,href:"/admin/all-user" },
  { id: 6, title: "Interview", content: "Integer sagittis neque a neque efficitur, sit amet varius purus posuere." ,href:"/admin/all-user" }
];

const Admin = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ width: '80%', margin: '0 auto' }}>
        {sampleData.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-4">{item.content}</p>
            <Link
              to={item.href}
              className="self-start bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
