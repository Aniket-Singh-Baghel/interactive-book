import React from 'react';

const blueprint = [
  {
    part: 'Part 1: The Basics - Understanding the Computer',
    chapters: [
      { id: 'ch1', title: 'Chapter 1: What is a Computer?', concept: 'Defining a computer as a helpful electronic machine.' },
      { id: 'ch2', title: 'Chapter 2: The Main Parts (Hardware)', concept: 'Introducing the physical components of a computer.' },
      { id: 'ch3', title: 'Chapter 3: The Brain of the Computer: The CPU', concept: 'Explaining the CPU\'s role as the central processing unit.' },
      { id: 'ch4', title: 'Chapter 4: Memory and Storage', concept: 'Differentiating between temporary memory (RAM) and permanent storage (Hard Drive).' },
      { id: 'ch5', title: 'Chapter 5: Input and Output Devices', concept: 'How we talk to the computer and how it talks back.' },
    ]
  },
  {
    part: 'Part 2: The Software Side - Giving Instructions',
    chapters: [
      { id: 'ch6', title: 'Chapter 6: What is Software?', concept: 'Explaining that software is the set of instructions that makes the hardware work.' },
      { id: 'ch7', title: 'Chapter 7: The Operating System (OS)', concept: 'Introducing the main software that manages the entire computer.' },
      { id: 'ch8', title: 'Chapter 8: Types of Software', concept: 'Differentiating between application software (like MS Word) and system software (like the OS).' },
    ]
  },
  {
    part: 'Part 3: Using a Computer - Practical Skills',
    chapters: [
      { id: 'ch9', title: 'Chapter 9: The Desktop and Basic Navigation', concept: 'Explaining the main screen and how to use the mouse and keyboard to navigate.' },
      { id: 'ch10', title: 'Chapter 10: Files and Folders', concept: 'Understanding how to organize your documents, photos, and videos.' },
      { id: 'ch11', title: 'Chapter 11: Copy, Cut, Paste, and Delete', concept: 'Explaining basic commands for managing files and text.' },
    ]
  },
  {
    part: 'Part 4: The Digital World - Internet & Safety',
    chapters: [
      { id: 'ch12', title: 'Chapter 12: What is the Internet?', concept: 'Introducing the internet as a global network of computers.' },
      { id: 'ch13', title: 'Chapter 13: Web Browsers and Websites', concept: 'Explaining how to access the internet.' },
      { id: 'ch14', title: 'Chapter 14: Digital Safety', concept: 'Teaching students how to protect themselves and their data online.' },
    ]
  },
  {
    part: 'Part 5: Looking Ahead - From Beginner to Pro',
    chapters: [
      { id: 'ch15', title: 'Chapter 15: Different Types of Computers', concept: 'Exploring desktop computers, laptops, tablets, and smartphones.' },
      { id: 'ch16', title: 'Chapter 16: An Introduction to Coding', concept: 'Briefly explaining what coding is and why it\'s important.' },
    ]
  },
];

const BlueprintTable = () => {
  return (
    <section className="bg-gray-100 p-6 rounded-xl shadow mb-10">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">📘 Blueprint - Table of Contents</h2>
      <div className="space-y-6">
        {blueprint.map((part, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{part.part}</h3>
            <ul className="space-y-2 pl-4">
              {part.chapters.map((ch) => (
                <li key={ch.id}>
                  <a href={`#${ch.id}`} className="text-indigo-600 hover:underline block">
                    {ch.title} — <span className="text-sm text-gray-600 italic">{ch.concept}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlueprintTable;
