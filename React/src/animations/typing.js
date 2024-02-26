import { useState, useEffect } from 'react';

const useTypingEffect = (textToType, delay = 100) => {
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    let typingInterval;

    const startTyping = () => {
      typingInterval = setInterval(() => {
        setTypedText(textToType.slice(0, index));
        index++;

        if (index > textToType.length) {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
        }
      }, delay);
    };

    startTyping();

    // Clear the interval when the component is unmounted
    return () => clearInterval(typingInterval);
  }, [textToType, delay]);

  return { typedText, isTypingComplete };
};

export default useTypingEffect;
