import { useState, createRef  } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
import {TextStyler} from './TextStyler.jsx'
import {ImageUploader} from './ImageUploader.jsx'
const style = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
}

// const TemplateSizeSection = () => {
//   return (
//     <div className='template-size-section'>
//       <div>
//         <input type="file" />
//       </div>
//       <div>
//         <input type="text" name="width-b" placeholder='Ширина в процентах' />
//         <input type="text" name="height-b" placeholder='Высота в процентах' />
//       </div>
//     </div>
//   )
// }


const DeleteBox = ({handleDelete, id}) => {
  return (
    <button className='delete-box' onClick={() => handleDelete(id)}>
      <svg viewBox="0 0 1024 1024" fill="#ca1c1c" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ca1c1c"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z" fill=""></path><path d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z" fill=""></path></g></svg>
    </button>
  )
}


// const BlockWithLines = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [topLineCoords, setTopLineCoords] = useState({});
//   const [bottomLineCoords, setBottomLineCoords] = useState({});
//   const [leftLineCoords, setLeftLineCoords] = useState({});
//   const [rightLineCoords, setRightLineCoords] = useState({});

//   const handleMouseEnter = (event) => {
//     const { top, bottom, left, right, width, height } = event.target.getBoundingClientRect();
//     const blockWidth = width;
//     const blockHeight = height;

//     setTopLineCoords({ top, left: left - blockWidth, width: blockWidth });
//     setBottomLineCoords({ top: bottom, left: left + blockWidth, width: blockWidth });
//     setLeftLineCoords({ top: top - blockHeight, left, height: blockHeight });
//     setRightLineCoords({ top: top + blockHeight, left: right, height: blockHeight });

//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   return (
//     <div
//       className="block"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {isHovered && (
//         <>
//           <div 
//             className="line top-line"
//             style={{
//               top: topLineCoords.top,
//               left: topLineCoords.left,
//               width: topLineCoords.width
//             }}
//           />
//           <div 
//             className="line bottom-line"
//             style={{
//               top: bottomLineCoords.top,
//               left: bottomLineCoords.left,
//               width: bottomLineCoords.width
//             }}
//           />
//           <div 
//             className="line left-line"
//             style={{
//               top: leftLineCoords.top,
//               left: leftLineCoords.left,
//               height: leftLineCoords.height
//             }}
//           />
//           <div 
//             className="line right-line"
//             style={{
//               top: rightLineCoords.top,
//               left: rightLineCoords.left,
//               height: rightLineCoords.height
//             }}
//           />
//         </>
//       )}
//       {/* Здесь можно добавить содержимое блока */}
//     </div>
//   );
// };

const ViewMessenger = ({ selectMess, setSelectMess, el, valueMessenger, setValueMessenger }) => {
  const [active, setActive] = useState(false);
  const handleChange = (e) => {
    const inputValue = e.target.value;
    const isDuplicate = valueMessenger.some((item) => item.type === el);
    
    if (isDuplicate) {
      setValueMessenger(prevState =>
        prevState.map(item => {
          if (item.type === el) {
            return { ...item, text: inputValue };
          }
          return item;
        })
      );
    } else {
      setValueMessenger(prevState => ([...prevState, { text: inputValue, type: el }]));
    } 
  };
// console.log(selectMess)
  const handleDelete = (elem) => {
 
    setValueMessenger((prevState) => prevState.filter((item) => item.type !== elem));
    const chatType = Object.keys(selectMess); 

    setSelectMess((prevState) => {
      const newState = { ...prevState };
      delete newState[el];
      return newState;
    });
  };


 

 // console.log(valueMessenger);

  return (
    <div className='mess-line' >    
        <div className='mess-line__m' data-mess={el} onClick={()=>setActive(!active)}>
      
        </div>
        <button className='delete-mess' onClick={() => handleDelete(el)}>
        <svg fill="#ca1212" viewBox="-3.5 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg" stroke="#ca1212"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"></path></g></svg> 
        </button>
        {active && (
          <div className='input-mess' >
            <input type="text" placeholder={`Номер ${el}`} onChange={(e) => handleChange(e)} />
          </div>     
        )}
    </div>
  );
};

const ComponentMessenger = ({messengersList}) => {
  const [selectMess, setSelectMess] = useState([]);
  const [valueMessenger, setValueMessenger] = useState([]);

  const handleClick = (messenger, value) => {
  //   if (selectMess){
  //     setSelectMess({
  //       ...selectMess,
  //       messenger
  //     })
  //     return false;
  //   }
  //   setSelectMess(messenger);

  // }
  if (!selectMess.hasOwnProperty(messenger)) {
    setSelectMess(prevState => ({ ...prevState, [messenger]: value }));
  } else {
    // Если элемент уже присутствует, выполняем нужные действия
    // например, показываем сообщение об ошибке или игнорируем дубликат
    console.log("Дубликат элемента!");
  }
 // setSelectMess(prevState => [...prevState, messenger]);
       //setSelectMess(selectMess.push(messenger))
//console.log(Object.values(selectMess))
  }
  return (
    <>
      <div className="list-mess">
        <p>Выберите мессенеджер</p>
      {Object.keys(messengersList)
        .map((messenger, index) => (
            <div className='list-mess__el' data-type={messenger} onClick={() => handleClick(messenger, Object.values(messengersList)[index])}>{messenger}</div>
          )
          )}                  
      </div>
      <div className='select-messenger'>{
        Object.keys(selectMess).map( (el, index) => {
          return (<ViewMessenger el={el} selectMess={selectMess} setSelectMess={setSelectMess} valueMessenger={valueMessenger} setValueMessenger={setValueMessenger} />)
        })
      }</div>
    </>
  )
}


export const Box = ({ id, left, top, hideSourceOnDrag, children, data, activeElement, selectComponent, seSelectComponent }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  )
  function createMarkup(data) {
    return {__html: 'test'};
  }


  const handleDelete = (id) => {
    seSelectComponent((prevState) => prevState.filter((item) => item.id !== id));
   // console.log(selectComponent)
  }

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />
  }


  const messengersList = {
    telegram: {
      icon: '/img/telegram_icon.png',
      link: 'https://t.me/'
    },
    whatsapp: {
      icon: '/img/telegram_icon.png',
      link: 'https://wa.me/'
    },
    viber: {
      icon: '/img/telegram_icon.png',
      link: 'viber://chat?number=%2B'
    },
    vk: {
      icon: '/img/telegram_icon.png',
      link: 'https://vk.com/'
    },    
  }

  switch (data.type){
    case 'image':
      return (
        <div 
        ref={drag}
        style={{ ...style, left, top }}
        className={!activeElement ? '_active': ''}
        data-testid="box">
      <DeleteBox handleDelete={handleDelete} id={data.id}/>
          <div 
          dangerouslySetInnerHTML={{__html: data.settings.template}}
          >           
          </div>
          <ImageUploader defaultWidth={200} defaultHeight={200}/>
        </div>
      )
      case 'button':
        return (
          <div
          ref={drag}
          style={{ ...style, left, top }}
          className={!activeElement ? '_active': ''}
          data-testid="box"
          >
            <DeleteBox handleDelete={handleDelete} id={data.id}/>
            <div 
            dangerouslySetInnerHTML={{__html: data.settings.template}}
            > 
            </div>
            <TextStyler 
              placeholder={'Введите название кнопки'} 
              selectComponent={selectComponent} 
              seSelectComponent={seSelectComponent}
              id={data.id} 
              />
          </div>
        )
      case 'text':
          return (
            <div
            ref={drag}
            style={{ ...style, left, top }}
            className={!activeElement ? '_active': ''}
            data-testid="box"
            >
               <DeleteBox handleDelete={handleDelete} id={data.id}/>
              <div 
              dangerouslySetInnerHTML={{__html: data.settings.template}}
              > 
              </div>
              <TextStyler 
               placeholder={'Введите текст'} 
               selectComponent={selectComponent} 
               seSelectComponent={seSelectComponent}
               id={data.id} 
               />
            </div>
          )
        case 'messenger':
          return (
            <div
            ref={drag}
            style={{ ...style, left, top }}
            className={!activeElement ? '_active': ''}
            data-testid="box"
            >
              <DeleteBox handleDelete={handleDelete} id={data.id}/>
              <div 
              dangerouslySetInnerHTML={{__html: data.settings.template}}
              > 
              </div>
             <div className='messenger-template'>
                <div className='messenger-template__element'>
                 <ComponentMessenger messengersList={messengersList}/>
                </div>
             </div>
            </div>
          )
      default:
        return (
          <div
            className="box"
            ref={drag}
            style={{ ...style, left, top }}
            data-testid="box"
          >
            {data.name}
          </div>
        )
  }


}
