function findDuplicateArrays(arr) {
  const tolerance = 10; // Допустимая погрешность

  const result = [];
  const visited = new Set();

  for (let i = 0; i < arr.length - 1; i++) {
    if (visited.has(i)) {
      continue;
    }

    const duplicates = [arr[i]];

    for (let j = i + 1; j < arr.length; j++) {
      const topDiff = Math.abs(arr[i].top - arr[j].top);
      const leftDiff = Math.abs(arr[i].left - arr[j].left);

      if (topDiff <= tolerance && leftDiff <= tolerance) {
        duplicates.push(arr[j]);
        visited.add(j);
      }
    }

    if (duplicates.length > 1) {
      result.push(duplicates);
    }
  }

  return result;
}

export const LineGlobal = ({selectComponent}) => {
  console.log(findDuplicateArrays(selectComponent))
    return (
      selectComponent.map( (el, index) => {
        const styleHorizontal = {
          left: `${el.left}px`,
          top: `${(el.left / 16)}px`,
          position: 'absolute',
          width: '0px',
          height: '100%',
          border: '1px dashed #a57318',
          zIndex: '9999',
          opacity: 0.5
        };
        const styleVertical = {
          left: `${(el.left / 16)}px`,
          top: `${el.top }px`,
          position: 'absolute',
          width: '100%',
          height: '0px',
          border: '1px dashed #a57318',
          zIndex: '9999',
          opacity: 0.5
        };
        const styleVerticalRight = {
          right: `${el.left + 9}px`,
          top: `${el.top + 9}px`,
          position: 'absolute',
          width: '100%',
          height: '1px',
          background: 'red',
          zIndex: '9999'
        };
        return (
          <>
          <div style={styleHorizontal}></div>
          <div style={styleVertical}></div>
          {/* <div style={styleVerticalRight}></div> */}
          </>
          )
      })    
     
    )
  }
  