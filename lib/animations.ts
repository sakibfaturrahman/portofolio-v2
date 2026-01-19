// Animation configuration helpers for Framer Motion
// Easily adjust durations, delays, and easing functions

export const ANIMATION_CONFIG = {
  // Duration values (in seconds)
  durations: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    verySlow: 0.8,
  },
  // Stagger delays for lists
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
  // Easing functions
  ease: {
    smooth: [0.25, 0.1, 0.25, 1],
    bouncy: [0.68, -0.55, 0.265, 1.55],
    snappy: [0.77, 0, 0.175, 1],
  },
} as const;

// Fade up animation variant
export const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.durations.normal,
      ease: ANIMATION_CONFIG.ease.smooth,
    },
  },
};

// Fade in animation variant
export const fadeInVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.durations.normal,
      ease: ANIMATION_CONFIG.ease.smooth,
    },
  },
};

// Scale up animation variant
export const scaleUpVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_CONFIG.durations.normal,
      ease: ANIMATION_CONFIG.ease.smooth,
    },
  },
};

// Slide in from left
export const slideInLeftVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_CONFIG.durations.normal,
      ease: ANIMATION_CONFIG.ease.smooth,
    },
  },
};

// Slide in from right
export const slideInRightVariants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_CONFIG.durations.normal,
      ease: ANIMATION_CONFIG.ease.smooth,
    },
  },
};

// Container variant for staggered children
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: ANIMATION_CONFIG.stagger.normal,
      delayChildren: 0.1,
    },
  },
};

// Item variant for staggered children
export const staggerItemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.durations.normal,
      ease: ANIMATION_CONFIG.ease.smooth,
    },
  },
};

// Text reveal animation (character by character)
export const textRevealContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

export const textRevealCharVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Hover scale effect
export const hoverScaleEffect = {
  scale: 1.05,
  transition: {
    duration: ANIMATION_CONFIG.durations.fast,
    ease: ANIMATION_CONFIG.ease.smooth,
  },
};

// Tap scale effect
export const tapScaleEffect = {
  scale: 0.95,
};

// Viewport settings for scroll animations
export const viewportSettings = {
  once: false, // Allow reverse animations
  amount: 0.3, // Trigger when 30% visible
  margin: "-50px",
};
