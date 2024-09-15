import React, { useEffect, useState } from 'react';
import { setDarkMode } from '@/features/darkModeSlice';
import { useSelector, useDispatch } from 'react-redux';

const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      dispatch(setDarkMode(true));
    } else {
      dispatch(setDarkMode(false));
    }
    setMounted(true);  
  }, []);

  // If the component has not mounted, do not render the children (prevents SSR mismatch)
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
};

export default ThemeProvider;
