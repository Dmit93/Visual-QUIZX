import { useState, createRef, useRef, useEffect } from 'react';
import {Uploader} from '../templates/Uploader.jsx'


export const BlockDivider = ({ type, children, block1Width = 50, block2Width = 50, dividerPosition = 50 }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [divPos, setDivPos] = useState(dividerPosition);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setDragOffset(event.clientX - (event.clientX / containerWidth) * containerWidth);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;

    let newPosition = ((event.clientX - dragOffset) / containerWidth) * 100;

    if (newPosition < 0) {
      newPosition = 0;
    } else if (newPosition > 100) {
      newPosition = 100;
    }

    setDivPos(newPosition);
  };

  const block1Style = {
    width: `${divPos}%`,
  };

  const block2Style = {
    width: `${100 - divPos}%`,
  };

  const dividerStyle = {
    left: `${divPos}%`,
    userSelect: 'none'
  };

  return (
    <div
      className={`template-flex ${type}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={containerRef}
    >

      {type === 'row' && (
        <>          
          <div className='row--container' style={block1Style}>{children}</div>
          <div className='row--picture' style={block2Style}><Uploader /></div>
          <div
            className="divider"
            onMouseDown={handleMouseDown}
            style={{ ...dividerStyle, cursor: isDragging ? "ew-resize" : "default" }}
          >
          </div>
        </>
        )}

      {type === 'rowReverse' && (
         <>
          <div className='row--picture' style={block1Style}><Uploader /></div>
          <div className='row--container' style={block2Style}>{children}</div>
          <div
            className="divider"
            onMouseDown={handleMouseDown}
            style={{ ...dividerStyle, cursor: isDragging ? "ew-resize" : "default" }}
          >
          </div>
         </>
        )}


      {type === 'column' && (
         <>
          <div className='template--column'>
            {children}
          </div>
         </>
        )}

    </div>
  );
};