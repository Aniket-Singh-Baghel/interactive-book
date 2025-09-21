import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Layout, Palette, Zap } from 'lucide-react';

const CodeBlock = ({ code }) => (
  <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
    <code>{code}</code>
  </pre>
);

const StepVisuals = ({ step, content }) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleButtonClick = () => {
    if (step === 3) {
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const isWireframe = step === 0;
  const showHtml = step >= 1;
  const showCss = step >= 2;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
        className="flex justify-center items-center h-96"
      >
        <div 
          className={`w-64 rounded-2xl p-4 flex flex-col transition-all duration-500
            ${isWireframe ? 'border-2 border-dashed border-gray-400' : 'shadow-lg bg-white'}
          `}
        >
          <div className="h-32 rounded-lg bg-gray-200 flex items-center justify-center relative overflow-hidden">
            {isWireframe && (
              <div className="w-full h-full border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-sm">Image</span>
              </div>
            )}
            {showHtml && !isWireframe && (
              <motion.img
                src="https://cdn.moglix.com/p/13JDkCzbv6uhD-xxlarge.jpg"
                alt="Gadget"
                className="w-full"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: showCss ? 1 : 1.1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
          
          <div className="mt-4 flex-grow flex flex-col">
            {isWireframe && (
              <>
                <div className="h-6 w-3/4 rounded bg-gray-300 border-2 border-dashed border-gray-400"></div>
                <div className="h-4 w-full mt-2 rounded bg-gray-300 border-2 border-dashed border-gray-400"></div>
                <div className="h-4 w-5/6 mt-1 rounded bg-gray-300 border-2 border-dashed border-gray-400"></div>
                <div className="w-full mt-auto h-12 rounded-lg bg-gray-300 border-2 border-dashed border-gray-400"></div>
              </>
            )}
            {showHtml && !isWireframe && (
              <>
                <motion.h3 
                  className={`font-bold text-lg ${!showCss && 'text-gray-700'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, color: showCss ? '#1f2937' : '#374151' }}
                >
                  {content.card.title}
                </motion.h3>
                <motion.p 
                  className={`text-sm mt-1 flex-grow ${!showCss && 'text-gray-500'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.1 }, color: showCss ? '#4b5563' : '#6b7282' }}
                >
                  {content.card.description}
                </motion.p>
                
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                  whileHover={{ scale: step === 3 ? 1.05 : 1 }}
                  whileTap={{ scale: step === 3 ? 0.95 : 1 }}
                  onClick={handleButtonClick}
                  className={`w-full mt-4 h-12 rounded-lg font-bold text-lg flex items-center justify-center transition-colors duration-300
                    ${!showCss && 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                    ${showCss && !addedToCart && 'bg-blue-500 text-white'}
                    ${showCss && addedToCart && 'bg-green-500 text-white'}
                  `}
                >
                  {addedToCart ? content.card.buttonAdded : content.card.button}
                </motion.button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const InteractiveWorkflow = ({ content }) => {
  const [step, setStep] = useState(0);

  const steps = [
    { icon: <Layout />, ...content.steps[0] },
    { icon: <Code />, ...content.steps[1] },
    { icon: <Palette />, ...content.steps[2] },
    { icon: <Zap />, ...content.steps[3] },
  ];

  return (
    <div className="bg-gray-50 rounded-2xl p-6 md:p-8 shadow-inner">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{content.title}</h2>
      
      {/* Step buttons */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
        {steps.map((s, index) => (
          <motion.button
            key={index}
            onClick={() => setStep(index)}
            className={`px-4 py-2 rounded-full font-semibold text-sm md:text-base flex items-center gap-2 transition-colors duration-300
              ${step === index ? 'bg-sky-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-sky-100'}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {s.icon}
            {s.title}
          </motion.button>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="order-2 lg:order-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{steps[step].title}</h3>
          <p className="text-gray-600 mb-4 min-h-[6rem]">{steps[step].description}</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {steps[step].code && <CodeBlock code={steps[step].code} />}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="order-1 lg:order-2">
          <StepVisuals step={step} content={content} />
        </div>
      </div>
    </div>
  );
};

export default InteractiveWorkflow;
