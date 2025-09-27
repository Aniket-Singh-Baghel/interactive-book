import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mui/material';

const WarningModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-dashed border-red-500 max-w-sm w-full text-center"
          >
            <h2 className="text-4xl font-creepster text-red-600 mb-4">Warning!</h2>
            <p className="text-lg text-gray-800 mb-6">
              You have left the quiz tab. This is not allowed. If you leave again, you will be disqualified.
            </p>
            <Button
              onClick={onClose}
              variant="contained"
              size="large"
              className="!bg-red-600 hover:!bg-red-700 !text-white !font-bold rounded-full shadow-lg"
            >
              I Understand
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WarningModal;