import React, { useRef, useEffect } from 'react';

const KeyboardInstructions = (props) => {
  const elementRef = useRef(null);

  useEffect(() => {
      if (elementRef.current) { 
        elementRef.current.isInteractive = props.isInteractive;
        elementRef.current.hasCousinNavigation = props.hasCousinNavigation;
        elementRef.current.disabled = props.disabled;    
      }
  }, []);

  return <keyboard-instructions
    uniqueID={'thisIsATest'}
    geomType={'bar'}
    groupName={'bar group'}
    chartTag={'bar-chart'}
    width={800}
    ref={elementRef}
></keyboard-instructions>;
};

export default KeyboardInstructions;