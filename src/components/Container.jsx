import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { Box } from './Box.jsx'
import { ItemTypes } from './ItemTypes.js'
const styles = {
    width: '100%',
    height: '100svh',
    border: '1px solid black',
    position: 'relative',
}
export const Container = ({ hideSourceOnDrag, selectComponent, seSelectComponent, activeElement }) => {
    const [boxes, setBoxes] = useState({
        a: { top: 20, left: 80, title: 'Drag me around' },
        b: { top: 180, left: 20, title: 'Drag me too' },
        11: { top: 180, left: 20, title: 'Drag me too' },
    })
    const moveBox = useCallback(
        (id, left, top) => {
            seSelectComponent(
                update(selectComponent, {
                    [id]: {
                        $merge: { left, top },
                    },
                }),
            )
        },
        [selectComponent, seSelectComponent],
    )
    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.BOX,
            drop(item, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset()
                const left = Math.round(item.left + delta.x)
                const top = Math.round(item.top + delta.y)
                moveBox(item.id, left, top)

                return undefined
            },
        }),
        [moveBox],
    )
    return (
        <div className='main-create' ref={drop} style={styles}>
            {Object.keys(selectComponent).map((key) => {
                const { left, top, title } = selectComponent[key]
                return (
                    <Box
                        key={key}
                        id={key}
                        left={left}
                        top={top}
                        hideSourceOnDrag={hideSourceOnDrag}
                        data={selectComponent[key]}
                        activeElement={activeElement}
                        selectComponent={selectComponent}
                        seSelectComponent={seSelectComponent}
                    >
                        {title}
                    </Box>
                )
            })}
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

export default Container;