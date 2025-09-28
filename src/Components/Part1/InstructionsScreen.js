import React from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BookmarkIcon from '@mui/icons-material/Bookmark';

const MockButton = ({ children, className, startIcon, endIcon }) => (
  <div className={`inline-flex items-center justify-center px-4 py-2 rounded-full font-semibold shadow-md ${className}`}>
    {startIcon && <span className="mr-2">{startIcon}</span>}
    {children}
    {endIcon && <span className="ml-2">{endIcon}</span>}
  </div>
);

const InstructionsScreen = ({ t, onContinue, lang, setLang }) => {
  const instructions = t.instructions || [];

  const renderDescription = (item) => {
    const descriptionText = <p className="whitespace-pre-wrap text-sm text-gray-700">{item.description}</p>;
    
    switch(item.feature) {
      case "Question Grid":
      case "प्रश्न ग्रिड":
        return (
          <div>
            {descriptionText}
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-5 h-5 bg-green-500 border border-green-600 rounded"></div><span className="text-sm">Answered / उत्तर दिया हुआ</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-5 h-5 bg-yellow-400 border border-yellow-500 rounded"></div><span className="text-sm">Marked for Review / समीक्षा के लिए चिह्नित</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-5 h-5 bg-white border border-gray-400 rounded"></div><span className="text-sm">Skipped / छोड़ा हुआ</span>
            </div>
          </div>
        );
      case "Next/Skip Button":
      case "अगला/स्किप बटन":
        return (
          <div>
            {descriptionText}
            <div className="flex items-center space-x-4 mt-2">
              <MockButton className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white" endIcon={<ArrowForwardIcon fontSize="small" />}>
                {t.nextQuestion}
              </MockButton>
              <MockButton className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white" endIcon={<ArrowForwardIcon fontSize="small" />}>
                Skip
              </MockButton>
            </div>
          </div>
        );
      case "Review Button":
      case "रिव्यू बटन":
         return (
          <div>
            {descriptionText}
            <div className="mt-2">
              <MockButton className="border-2 border-yellow-500 text-yellow-600" startIcon={<BookmarkIcon fontSize="small" />}>
                Review
              </MockButton>
            </div>
          </div>
        );
      case "Hint Button":
      case "संकेत बटन":
        return (
          <div>
            {descriptionText}
            <div className="mt-2">
              <MockButton className="border-2 border-orange-500 text-orange-600" startIcon={<LightbulbIcon fontSize="small" />}>
                {t.showHint}
              </MockButton>
            </div>
          </div>
        );
      default:
        return descriptionText;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl relative">
        <div className="absolute top-4 right-4 flex space-x-2">
          <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border-2 font-semibold ${lang === "en" ? "bg-purple-600 text-white border-purple-700" : "bg-white/80 text-gray-800 border-purple-400"} transition`}>EN</button>
          <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border-2 font-semibold ${lang === "hi" ? "bg-purple-600 text-white border-purple-700" : "bg-white/80 text-gray-800 border-purple-400"} transition`}>हिं</button>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-6 text-center mt-12">{t.instructionsTitle}</h1>
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-300">
            <thead className="bg-purple-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                  {t.feature}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                  {t.description}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {instructions.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 align-top pt-5">{item.feature}</td>
                  <td className="px-6 py-4">{renderDescription(item)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {instructions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 rounded-lg shadow"
            >
              <h3 className="text-md font-bold text-purple-700 mb-2">{item.feature}</h3>
              <div>{renderDescription(item)}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button
            onClick={onContinue}
            variant="contained"
            size="large"
            className="!bg-gradient-to-r !from-green-500 !to-blue-500 hover:!from-green-600 hover:!to-blue-600 !text-white !font-bold rounded-full shadow-lg !px-10 !py-3 !text-lg transition-all duration-300"
          >
            {t.continue}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsScreen;