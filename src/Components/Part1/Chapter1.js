import React from "react";
import { FaPepperHot, FaBlender, FaCheckCircle,FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'

const Chapter1 = () => {
  const navigate = useNavigate()
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-center">
        <Link
          to="/parts/prt1"
          className="px-6 py-2 bg-yellow-400 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition"
        >
          🏠 Home
        </Link>
      </div>
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        {/* Tabs */}


        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Chapter 1: What is a Computer? 🤖
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Let's understand what a computer is with a simple real-life example and a formal definition.
        </p>

        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src='https://4.imimg.com/data4/RQ/PS/MY-25091456/how-to-donate-computer-1-500x500.jpg'
            alt="Old computer"
            className="rounded-lg shadow-md w-full max-w-md"
          />
        </div>

        {/* A Simple Machine Card */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
            A Simple Machine
          </h2>
          <p className="text-gray-700 text-center mb-6">
            A computer is a smart machine that helps us with our work, just like a <strong>mixer grinder</strong> in the kitchen. Let's see how they are similar.
          </p>
          <div className="flex justify-around items-center">
            <div className="text-center">
              <FaPepperHot className="text-3xl mx-auto text-red-500" />
              <p className="font-semibold">Raw Spices</p>
              <p className="text-sm">You put these in.</p>
            </div>
            <div className="text-center">
              <FaBlender className="text-3xl mx-auto text-blue-500" />
              <p className="font-semibold">Grinding</p>
              <p className="text-sm">The machine does the work.</p>
            </div>
            <div className="text-center">
              <FaCheckCircle className="text-3xl mx-auto text-orange-500" />
              <p className="font-semibold">Spice Powder</p>
              <p className="text-sm">The finished result.</p>
            </div>
          </div>
        </div>

        {/* Technical Definition */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-3 text-center text-pink-600">The Technical Definition</h2>
          <p className="text-gray-700">
            In technical terms, a <strong>computer</strong> is an <strong>electronic device</strong> that manipulates <strong>information</strong>, or <strong>data</strong>,
            according to a set of <strong>instructions</strong>. It has the ability to <strong>store</strong>, <strong>retrieve</strong>, and <strong>process data</strong>.
          </p>
          <p className="mt-4 text-gray-700">
            Computers can perform complex calculations at lightning speed, automate tasks, and run software that helps us with communication, creativity,
            problem-solving, entertainment, and much more.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-end items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
        <button
          onClick={() => navigate('/part1/chapters/ch2')}
          className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
        >
          Next
          <FaArrowRight />
        </button>
      </div>

    </div>
  );
};

export default Chapter1;
