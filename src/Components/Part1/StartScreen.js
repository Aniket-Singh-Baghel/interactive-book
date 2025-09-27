import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { motion } from "framer-motion";

const StartScreen = ({ t, startQuiz }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleStart = () => {
    if (name.trim()) {
      startQuiz(name.trim());
    } else {
      setError(t.nameRequired);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.trim()) {
      setError("");
    }
  };

  return (
    <div
      // A bright, distracting gradient background
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-lime-200 via-yellow-200 to-orange-200"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        // A slightly transparent card with a dashed border to be distracting
        className="text-center bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border-4 border-dashed border-purple-500 w-full max-w-md"
      >
        {/* Using the "Creepster" font for a jarring title on a light theme */}
        <h1 className="text-5xl sm:text-6xl font-creepster text-purple-700 mb-4">
          {t.bestOfLuck}
        </h1>
        <p className="text-base sm:text-lg text-gray-800 mb-6">{t.welcomeMessage || "Welcome to the Computer Quiz! Enter your name to begin."}</p>
        <div className="mb-6">
          <TextField
            label={t.nameLabel || "Your Name"}
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            fullWidth
            error={!!error}
            helperText={error || ' '}
            InputLabelProps={{
              style: { color: '#8b5cf6' }, // purple-500
            }}
            InputProps={{
              style: {
                color: '#1f2937', // gray-800
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '8px',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#a855f7', // purple-600
                },
                '&:hover fieldset': {
                  borderColor: '#9333ea', // purple-700
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#7e22ce', // purple-800
                },
              },
            }}
            FormHelperTextProps={{
              className: "!text-red-500 !text-base",
            }}
          />
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* A bright, clashing button */}
          <Button
            onClick={handleStart}
            variant="contained"
            size="large"
            className="!bg-gradient-to-r !from-pink-500 !to-yellow-500 hover:!from-pink-600 hover:!to-yellow-600 !text-white !font-bold rounded-full shadow-lg !px-8 sm:!px-10 !py-3 sm:!py-4 !text-lg sm:!text-xl transition-all duration-300"
          >
            {t.startQuiz}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StartScreen;