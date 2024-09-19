// Context to manage welcome animation. It will be used to disable the animation after the first time it is played.

import React, { createContext, useContext, useState } from 'react';

// Create the context
const AnimationContext = createContext();
// Custom hook to use the context
export const useAnimationContext = () => useContext(AnimationContext);

// Create the provider component
export const AnimationProvider = ({ children }) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  const disableAnimation = () => setHasAnimated(true);

  return (
    <AnimationContext.Provider value={{ hasAnimated, disableAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
};

