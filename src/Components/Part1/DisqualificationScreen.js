import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';

const DisqualificationScreen = ({ onShowResults }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-200 via-orange-200 to-yellow-200 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border-4 border-dashed border-red-500 max-w-lg w-full text-center"
      >
        <h2 className="text-5xl sm:text-6xl font-creepster text-red-700 mb-4">Disqualified!</h2>
        <p className="text-lg sm:text-xl text-gray-800 mb-8">
          You have been disqualified for leaving the quiz tab multiple times.
        </p>
        <Button
          onClick={onShowResults}
          variant="contained"
          size="large"
          className="!bg-red-600 hover:!bg-red-700 !text-white !font-bold rounded-full shadow-lg !px-8 !py-3"
        >
          Show My Results
        </Button>
      </motion.div>
    </div>
  );
};

export default DisqualificationScreen;