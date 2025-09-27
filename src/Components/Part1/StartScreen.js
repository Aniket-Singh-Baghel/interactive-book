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
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100"
      style={{ fontFamily: "'Comic Neue', cursive" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center bg-white p-8 rounded-2xl shadow-2xl border-4 border-purple-300 w-full max-w-md"
      >
        <h1 className="text-4xl font-extrabold text-purple-700 mb-4">
          {t.bestOfLuck}
        </h1>
        <p className="text-lg text-gray-600 mb-6">{t.welcomeMessage || "Welcome to the Computer Quiz! Enter your name to begin."}</p>
        <div className="mb-6">
          <TextField
            label={t.nameLabel || "Your Name"}
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            fullWidth
            error={!!error}
            helperText={error || ' '}
            FormHelperTextProps={{
              className: "!text-red-500 !text-base",
            }}
          />
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleStart}
            variant="contained"
            size="large"
            className="!bg-gradient-to-r !from-green-500 !to-teal-500 hover:!from-green-600 hover:!to-teal-600 !text-white !font-bold rounded-full shadow-lg !px-10 !py-4 !text-xl transition-all duration-300"
          >
            {t.startQuiz}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StartScreen;