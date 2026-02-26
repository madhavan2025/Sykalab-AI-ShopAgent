import { motion } from "framer-motion";

interface GreetingProps {
  theme?: any;
}

export const Greeting = ({ theme }: GreetingProps) => {
  return (
    <div
      className="mx-auto mt-4 flex size-full max-w-3xl flex-col justify-center px-4 md:mt-16 md:px-8"
      key="overview"
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
        style={{
          color: theme?.welcomeTextColor,
        }}
        className="text-xl md:text-2xl"
      >
        {theme?.welcomeText || "How can I help you today?"}
      </motion.div>
    </div>
  );
};