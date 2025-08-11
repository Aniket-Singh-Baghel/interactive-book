import React from "react";
import { Link } from "react-router-dom";

function App() {
  const chapters = [
    {
      part: "Part 1: The Basics - Understanding the Computer",
      items: [
        {
          id: "ch1",
          title: "The Desktop and Basic Navigation",
          concept: "Explaining the main screen and how to use the mouse and keyboard to navigate.",
        },
        {
          id: "ch2",
          title: "Files and Folders",
          concept: "Understanding how to organize your documents, photos, and videos.",
        },
        {
          id: "ch3",
          title: "Copy, Cut, Paste, and Delete",
          concept: "Explaining basic commands for managing files and text.",
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
