import { useState, createRef, useRef, useEffect  } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { v4 as uuid } from 'uuid';
import './App.css'
import {Container} from './components/Container.jsx'
import {Uploader} from './templates/Uploader.jsx'
import {BlockDivider} from './components/BlockDivider.jsx'
import { LineGlobal } from './components/LineGlobal.jsx';
// import {TextStyler} from './components/TextStyler.jsx'

const obj = {
  image: {
    name: 'Изображение',
    type: 'image',
    top:0,
    left:0,
    settings: {
     // template: '<input type="file">'
    }
  },
  text: {
    name: 'Текст',
    type: 'text',
    top:0,
    left:0,
    settings: {
     
    }
  },
  button: {
    name: 'Кнопка',
    type: 'button',
    top:0,
    left:0,
    settings: {
     
    }
  },
  messenger: {
    name: 'Мессенджеры',
    type: 'messenger',
    top:0,
    left:0,
    settings: {
      
    }
  }
}


const TemplateComponents = ({obj, index, selectComponent, seSelectComponent}) => {
 // console.log(obj)
 const uniqueId = uuid();
 const editObj = {...obj, id: uniqueId}
  const handleClick = (e) => {  
    seSelectComponent([...selectComponent, editObj]);
  }
  return (
    <div className='template-component-elem' data-type={obj.type} onClick={handleClick}>{obj.name}</div>
  )
}


const ListComponents = ({selectComponent, seSelectComponent, activeElement, setActiveElement, changeLine, setChangeLine}) => {
  const [data, setDate] = useState(obj);

  const changeStateActive = () => {
    setActiveElement(!activeElement);
  }

  const changeStateLine = () => {
    setChangeLine(!changeLine);
  }
 
  return (
    <div className='fixed-menu'>
      <div className="list-components">
          {Object.keys(data).map( (el, index) => {
            return ( <TemplateComponents key={index} index={index} selectComponent={selectComponent} seSelectComponent={seSelectComponent} obj={Object.values(data)[index]}/>)
    
          })}
            <div>
              Скрыть элементы
              <input type="checkbox" onChange={changeStateActive} />
            </div>
            <div>
             Отобразить линии
              <input type="checkbox" onChange={changeStateLine} />
            </div>
      </div>
    
    </div>
  )
}


const ElementSelect = ({date}) =>  {
  return (
    <div className='element-select'>
      <p>{date.name}</p>
    </div>
  )
}



const Body = ({selectComponent}) => {
  console.log(selectComponent)
  return (
    <div className='main-create'>
      {selectComponent.map( (el, index) => {
       return( <ElementSelect key={index} date={el} /> )
      })}
    </div>
  )
}

// const DragAndDrop = () => {
//   const [dragElements, setDragElements] = useState({});
//   const [coords, setCoords] = useState({x:'', y:''})

//   const handleDragStart = (event, id) => {
//     event.dataTransfer.setData('text/plain', id);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleDrop = (event, targetId) => {
//     event.preventDefault();
//     const draggedId = event.dataTransfer.getData('text/plain');
//     const { x, y } = getCoordinates(event);
    
//     setDragElements(prevState => ({
//       ...prevState,
//       [draggedId]: { x, y }
//     }));
//     setCoords({x:x, y:y})
//   };

//   const getCoordinates = (event) => {
//     const boundingRect = event.target.getBoundingClientRect();
//     const offsetX = event.clientX - boundingRect.left;
//     const offsetY = event.clientY - boundingRect.top;
    
//     return { x: offsetX, y: offsetY };
//   };

//   const style = {
//     transform: `translate(${coords.x}px, ${coords.y}px)`
//   }

//   return (
//     <div>
//       <div
//         onDragOver={handleDragOver}
//         onDrop={(event) => handleDrop(event, 'dropzone')}
//       >
//         <div
//           draggable
//           onDragStart={(event) => handleDragStart(event, 'element1')}
//         style={style}
//         >
//           Element 1
//         </div>
//         <div
//           draggable
//           onDragStart={(event) => handleDragStart(event, 'element2')}
//         >
//           Element 2
//         </div>
//         {/* Добавьте больше перетаскиваемых элементов по желанию */}
//       </div>
//       <pre>{JSON.stringify(dragElements, null, 2)}</pre>
//     </div>
//   );
// };


const TemplatePicture  = ({picture})=>{
  return (
  <div className='template-picture'>
    <input type="file" name="picture" />
  </div>
  )
}

const TemplateView = ({selectTemplate, children}) => {
 switch  (selectTemplate){
  case "row":
    return (
      <BlockDivider type={'row'} children={children} />
    );
  case "rowReverse":
      return (
        <BlockDivider type={'rowReverse'} children={children}/>
        // <div className='template-flex template--row-reverse'>
        //   <div className='row--picture'><Uploader /></div>
        //   <div className='row--container'>{children}</div>
        // </div>
      );
  case "column":
      return (
        <BlockDivider type={'column'} children={children} />
      );
  default :
    break;

 }
}

const SelectTemplateView = ({setSelectTemplateFirst}) => {
  const  [templateData, setTemplateData] = useState({
    row: {
      name: 'Строчный',
      img: 'https://quizx-panel.ru/templates/img/design/left.webp'
    },
    rowReverse: {
      name: 'Строчный (изображение слева)',
      img: 'https://quizx-panel.ru/templates/img/design/right.webp'
    },
    column: {
      name: 'Полный экран',
      img: 'https://quizx-panel.ru/templates/img/design/center.webp'
    }
  });
  const templateRef = createRef();

  // const getFileContent = async () => {
  //   try {
  //     let fileReader = new FileReader();
  //     await fileReader.readAsText(templateRef.current.files[0]);
  //     setTemplateData(fileReader.result);
  //   } catch (error) {
  //     console.log('Error: ', error)
  //   }
  // }

  const  addNewTemplate = ({index}) => {
    setSelectTemplateFirst(Object.keys(templateData)[index]);
  }

  return (
    <div className='template-views'>
      <p>Выбирети тип экрана </p>
      <div className='template-views__container'>
        {Object.keys(templateData).map( (el, index) => {
          return ( <div key={index} onClick={() => addNewTemplate({index})}>{Object.values(templateData)[index].name}<img src={Object.values(templateData)[index].img} /></div>)
        })}
      </div>
    </div>
  )
}


const SaveDocument = () => {

  const saveUrl = (action = "test123") => {
    //const obj = getFieldsInObject();

    let formData = new FormData();
    formData.append('action', action);
    fetch('https://quizx.ru/test.php', {
        method: "POST",
        body: formData,
    })
        .then(function (response) {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("User creation failed.");
            }
        })
        .then(function (data) {
            console.log(data);
            d
        })
        .catch(function (error) {
            console.log(error.message);
        });
}


  return (<button onClick={saveUrl}>Сохранить</button>)
}


function App() {
  const [selectComponent, seSelectComponent] = useState([]);
  const [selectTemplateFirst, setSelectTemplateFirst]  = useState(false);
  const [activeElement, setActiveElement] = useState(true); // Активация дополнительных элементов по типу настройки
  const [changeLine, setChangeLine] = useState(false); // Активация линий у блоков

// console.log(selectComponent)
// console.log(selectTemplateFirst)
  return (
    <>
     <SaveDocument />
     {!selectTemplateFirst && (
        <SelectTemplateView setSelectTemplateFirst={setSelectTemplateFirst}/>
    )}
    <ListComponents activeElement={activeElement} setActiveElement={setActiveElement} selectComponent={selectComponent} seSelectComponent={seSelectComponent} changeLine={changeLine} setChangeLine={setChangeLine} />
    <DndProvider backend={HTML5Backend}>
    {selectTemplateFirst && (
      <TemplateView  selectTemplate={selectTemplateFirst}>
                <Container activeElement={activeElement} selectComponent={selectComponent} seSelectComponent={seSelectComponent}/>
                {changeLine &&  <LineGlobal selectComponent={selectComponent} />}
               
      </TemplateView>
    )}
     </DndProvider>

    </>
  )
}

export default App
