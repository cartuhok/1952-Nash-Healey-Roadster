import React, { useState } from 'react';
import './style.css';

// Config for colors. Defines what colors are available for each type
const COLOR_CONFIG = {
  'Paint': [
    { colorName: 'greenpaint', colorCode: '#819b92' },
    { colorName: 'redpaint', colorCode: '#730008' },
    { colorName: 'blackpaint', colorCode: '#000000' }
  ],
  'Interior': [
    { colorName: 'creamleather', colorCode: '#F5DEB3' },
    { colorName: 'redleather', colorCode: '#4d1d1c' },
    { colorName: 'blackleather', colorCode: '#000000' }
  ],
  'Seating': [
    { colorName: 'creamleather', colorCode: '#F5DEB3' },
    { colorName: 'redleather', colorCode: '#4d1d1c' },
    { colorName: 'blackleather', colorCode: '#000000' }
  ],
  'Stitching': [
    { colorName: 'creamleather', colorCode: '#F5DEB3' },
    { colorName: 'redleather', colorCode: '#4d1d1c' },
    { colorName: 'blackleather', colorCode: '#000000' }
  ]
};


// The initial selected colors when the component mounts
const INITIAL_COLORS = {
  'Paint': 'greenpaint',
  'Interior': 'blackleather',
  'Seating': 'creamleather',
  'Stitching': 'blackleather',
};

// A map that associates each color type with a handler function for updating it
const colorChangeHandlers = {
  'Paint': 'setCarColor',
  'Interior': 'setInteriorColor',
  'Seating': 'setSeatColor',
  'Stitching': 'setStitchingColor',
};

//The Rightbar component, it displays a set of sections for choosing colors, and lets the user select a color for each type
const Rightbar = ({ setCarColor, setSeatColor, setInteriorColor, setStitchingColor }) => {
  
  // The currently selected tab
  const [selectedTab, setSelectedTab] = useState('Paint');

  // The currently selected color for each type
  const [selectedColors, setSelectedColors] = useState(() => INITIAL_COLORS);

  // Style object for the circles that represent colors
  const circleStyle = {
    display: 'inline-block',
    marginRight: '10px',
    cursor: 'pointer'
  };

  // Function that handles when a section is clicked
  // It changes the currently selected section
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  }


  // Function that handles when a color is clicked
  // It changes the selected color for the relevant type and calls the associated handler function
  const handleColorClick = (tabName, colorName) => {

    // Update the selected color for the clicked type
    setSelectedColors(prevColors => ({
      ...prevColors,
      [tabName]: colorName
    }));

    // Call the associated handler function with the new color
    const handlerName = colorChangeHandlers[tabName];
    const handler = { setCarColor, setSeatColor, setInteriorColor, setStitchingColor }[handlerName];
    handler(colorName)
  }

  

  // Map over each type of color to create a section for each
  const colorComponents = Object.keys(COLOR_CONFIG).map(tabName => {

    // Get the colors for this type
    const colors = COLOR_CONFIG[tabName];

    // Create an array of color circles
    const circles = colors.map(({ colorName, colorCode }) => {
      // Check if this color is the currently selected one for this type
      const isSelected = selectedColors[tabName] === colorName;
      // Style object for this color circle
      const circleStyles = {
        ...circleStyle,
        backgroundColor: colorCode,
        border: isSelected ? '2px solid dodgerblue' : '2px solid white'
      };

      

      // Return a circle that represents this color
      return (
        <p
          key={colorName}
          onClick={() => handleColorClick(tabName, colorName)}
          style={circleStyles}
          className='circle'
        ></p>
      );
    });



    // CSS class to add if this section is the currently selected tab
    const selectedClass = selectedTab === tabName ? 'selected' : '';

    // Return a section for this type
    return (
      <div key={tabName} className={`colors ${tabName} ${selectedClass}`}>
        <h3>{tabName}</h3>
        {circles}
      </div>
    );
  });

  return (
    <div className="rightbar">
      <div className='select'>
      <h2>SELECT</h2>
      </div>
      <div className="rightbarContainer">
        <div className="tabs">
          {/* The tabs for each color type */}
          {/* Each tab changes the selected tab when clicked */}
          {/* If a tab is the selected one, it has the 'active' CSS class */}
          <div onClick={() => handleTabClick('Paint')} className={selectedTab === 'Paint' ? 'active' : ''}>Paint</div>
          <div onClick={() => handleTabClick('Interior')} className={selectedTab === 'Interior' ? 'active' : ''}>Interior</div>
          <div onClick={() => handleTabClick('Seating')} className={selectedTab === 'Seating' ? 'active' : ''}>Seating</div>
          <div onClick={() => handleTabClick('Stitching')} className={selectedTab === 'Stitching' ? 'active' : ''}>Stitching</div>
        </div>
        {colorComponents}
      </div>
    </div>
  );
};

export default Rightbar;

