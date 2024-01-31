import React, { useState } from 'react';
import {ButtonSettings} from '../templates/ButtonSettings.jsx'



export const TextStyler = ({placeholder, id, selectComponent, seSelectComponent}) => {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [borderRadius, setborderRadius] = useState(0);
  const [fontWeight, setFontWeight] = useState('normal');
  const [color, setColor] = useState('#000');
  const [background, setBackground] = useState('transparent');
  const [active, setActive] = useState(false); // Активация блока  стилей для редактирования

  const addPropertyById = (id, newProperty) => {
    seSelectComponent(prevArray => {
      return prevArray.map(subArray => {
      
          if (subArray.id === id) {
            return { ...subArray, ...newProperty };
          }
          return subArray;
      
      });
    });
  };
  
  console.log(selectComponent)
  const handleTextChange = (event) => {
    setText(event.target.value);
    addPropertyById(id,  { text: event.target.value })
    // seSelectComponent(prev => {
    //   prev.filter( elem => {
    //     if (elem.id === id){
    //       console.log(elem)
    //     }
    //   })
    //   // const newState = { ...prev };
    //   // delete newState[el];
    //   // return newState;
    // })
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
    addPropertyById(id,  { fontSize: event.target.value })
  };

  const handleRadiusChange = (event) => {
    setborderRadius(event.target.value);
    addPropertyById(id,  { borderRadius: event.target.value })
  };

  const handleFontWeightChange = (event) => {
    setFontWeight(event.target.value);
    addPropertyById(id,  { fontWeight: event.target.value })
  };

  const colorEdit = (event) => {
    setColor(event.target.value);
    addPropertyById(id,  { color: event.target.value })
  };
  const backgroundEdit = (event) => {
    setBackground(event.target.value);
    addPropertyById(id,  { background: event.target.value })
  };
  const activeSettings = (event) => {
    setActive(!active);
  };



  return (
    <div>
      <div className='box-header'>
        <textarea value={text} onChange={handleTextChange} placeholder={placeholder} />
        <ButtonSettings func={activeSettings} />
      </div>
      {active && (<div className='settings'>
        <label>
          <span> Размер шрифта</span>
            <input
            type="range"
            min="12"
            max="48"
            step="1"
            value={fontSize}
            onChange={handleFontSizeChange}
            />
        </label>
        <label>
        <span> Закругление</span>
            <input
            type="range"
            min="0"
            max="70"
            step="1"
            value={borderRadius}
            onChange={handleRadiusChange}
            />
        </label>
        <label>
         <span> Жирность</span>
            <select value={fontWeight} onChange={handleFontWeightChange}>
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            </select>
        </label>
        <label>
        <span>Цвет текста</span>
            <input type="color"  onChange={colorEdit}/>
        </label>
        <label>
        <span>Цвет Фона</span>
            <input type="color"  onChange={backgroundEdit}/>
        </label>
      </div>)}
      <div
        style={{
          fontSize: `${fontSize}px`,
          fontWeight: fontWeight,
          color: color,
          background: background ? background : null,
          borderRadius: `${borderRadius}px`
        }}
      >
        {text}
      </div>
    </div>
  );
};

