import React from "react";
import { Link } from "react-router-dom";

function App() {
  const chapters = [
    {
      part: "Part 1: The Basics - Understanding the Computer",
      items: [
        {
          id: "ch1",
          title: "What is Software?",
          concept: "Explaining that software is the set of instructions that makes the hardware work.",
        },
        {
          id: "ch2",
          title: "Introducing the main software that manages the entire computer.",
          concept: "Introducing the physical components of a computer.",
        },
        {
          id: "ch3",
          title: "Types of Software",
          concept: "Differentiating between application software (like MS Word) and system software (like the OS).",
        },
      ],
    },
  ];

  return (
    <div className="App bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        📘 Interactive Book Blueprint
      </h1>

      {chapters.map((section, index) => (
        <div key={index} className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {section.part}
          </h2>
          <div className="space-y-3">
            {section.items.map((chapter) => (
              <Link
                key={chapter.id}
                to={`/chapters/${chapter.id}`}
                className="block p-4 bg-white rounded-lg shadow-md hover:bg-blue-100 transition"
              >
                <h3 className="text-lg font-semibold text-blue-600">
                  {chapter.title}
                </h3>
                <p className="text-gray-700">{chapter.concept}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
