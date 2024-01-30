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

const TemplateSizeSection = () => {
  return (
    <div className='template-size-section'>
      <div>
        <input type="file" />
      </div>
      <div>
        <input type="text" name="width-b" placeholder='Ширина в процентах' />
        <input type="text" name="height-b" placeholder='Высота в процентах' />
      </div>
    </div>
  )
}


const TemplateLine = () => {
  return (
    <div className='line-container'>
       <div className="line-left"></div>
       <div className="line-right"></div>
       <div className="line-bottom"></div>
    </div>
  )
}


const BlockWithLines = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [topLineCoords, setTopLineCoords] = useState({});
  const [bottomLineCoords, setBottomLineCoords] = useState({});
  const [leftLineCoords, setLeftLineCoords] = useState({});
  const [rightLineCoords, setRightLineCoords] = useState({});

  const handleMouseEnter = (event) => {
    const { top, bottom, left, right, width, height } = event.target.getBoundingClientRect();
    const blockWidth = width;
    const blockHeight = height;

    setTopLineCoords({ top, left: left - blockWidth, width: blockWidth });
    setBottomLineCoords({ top: bottom, left: left + blockWidth, width: blockWidth });
    setLeftLineCoords({ top: top - blockHeight, left, height: blockHeight });
    setRightLineCoords({ top: top + blockHeight, left: right, height: blockHeight });

    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <>
          <div 
            className="line top-line"
            style={{
              top: topLineCoords.top,
              left: topLineCoords.left,
              width: topLineCoords.width
            }}
          />
          <div 
            className="line bottom-line"
            style={{
              top: bottomLineCoords.top,
              left: bottomLineCoords.left,
              width: bottomLineCoords.width
            }}
          />
          <div 
            className="line left-line"
            style={{
              top: leftLineCoords.top,
              left: leftLineCoords.left,
              height: leftLineCoords.height
            }}
          />
          <div 
            className="line right-line"
            style={{
              top: rightLineCoords.top,
              left: rightLineCoords.left,
              height: rightLineCoords.height
            }}
          />
        </>
      )}
      {/* Здесь можно добавить содержимое блока */}
    </div>
  );
};



const ComponentMessenger = ({messengersList}) => {
  const [selectMess, setSelectMess] = useState([]);


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
console.log(Object.values(selectMess))
  }
  return (
    <>
      <div className="list-mess">
      {Object.keys(messengersList)
        .map((messenger, index) => (
            <div onClick={() => handleClick(messenger, Object.values(messengersList)[index])}>{messenger}</div>
          )
          )}                  
      </div>
      <div className='select-messenger'>{
        Object.keys(selectMess).map( (el, index) => {
        
         return( <div>{selectMess[el].link}</div> )
        })
      }</div>
    </>
  )
}


export const Box = ({ id, left, top, hideSourceOnDrag, children, data, activeElement }) => {
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
          <TemplateLine />
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
            <TemplateLine />
            <div 
            dangerouslySetInnerHTML={{__html: data.settings.template}}
            > 
            </div>
            <TextStyler placeholder={'Введите название кнопки'} />
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
              <TemplateLine />
              <div 
              dangerouslySetInnerHTML={{__html: data.settings.template}}
              > 
              </div>
              <TextStyler placeholder={'Введите текст'} />
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
              <TemplateLine />
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
