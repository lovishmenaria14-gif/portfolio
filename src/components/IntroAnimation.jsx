import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function IntroAnimation({ onFinish }) {
  const greetings = useMemo(
    () => [
      "Hello",
      "नमस्ते",
      "Hola",
      "Bonjour",
      "Ciao",
      "Olá",
      "Здравствуйте",
      "Merhaba",
      "Γειά",
      "Hej",
      "Hallo",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const timer = setTimeout(() => {
        setIndex((i) => i + 1);
      }, 180);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setVisible(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [index, greetings.length]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden bg-black"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.3,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          {/* Greeting */}
          <div className="flex h-full items-center justify-center">
            <motion.h1
              key={index}
              className="text-white text-5xl md:text-7xl lg:text-8xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.18 }}
            >
              {greetings[index]}
            </motion.h1>
          </div>

          {/* Animated Wave */}
          <motion.svg
            className="absolute -bottom-1 left-0 w-full"
            viewBox="0 0 1440 260"
            preserveAspectRatio="none"
            initial={{ y: 0 }}
            exit={{
              y: -120,
              transition: {
                duration: 1.3,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            <path
              fill="#000"
              d="M0,96L80,112C160,128,320,160,480,154C640,149,800,107,960,96C1120,85,1280,107,1440,128V260H0Z"
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}