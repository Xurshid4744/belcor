import React from "react";

const NavigationScroll = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return children || null;
};

export default NavigationScroll;
