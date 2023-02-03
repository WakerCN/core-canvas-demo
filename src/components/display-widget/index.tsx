import { DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import React from 'react';
import { DisplayWidget as DW } from '../../types/widget';
import './index.less';
import cx from 'classnames';
import { useEditorContext } from '../../contexts/editor';
type DisplayWidgetProps = {
  data: DW;
};

function DisplayWidget(props: DisplayWidgetProps) {
  const { editor, dispatch } = useEditorContext();
  const { selectWidget } = editor;
  const { data } = props;
  const isSelect = selectWidget === data.id;

  const dragObj = useDraggable({ id: data.id });
  const { setNodeRef, listeners, attributes, transform, active, isDragging } =
    dragObj;

  const { isOver, setNodeRef: setDragNodeRef } = useDroppable({
    id: data.id,
    data: data
  });

  // const style = transform
  //   ? {
  //       zIndex: 999,
  //       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
  //     }
  //   : undefined;

  const handleClick: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'select',
      payload: { id: data.id }
    });
  };

  return (
    <>
      <div
        ref={setNodeRef}
        className={cx('display-widget', { active: isSelect })}
        onClick={handleClick}
        // style={style}
        {...attributes}
      >
        <div ref={setDragNodeRef} className={cx('drop-wrap')}>
          {data.id}
        </div>
        {active ? (
          <DragOverlay>
            <div
              style={{
                width: 50,
                height: 50,
                background: '#95de64',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              drag
            </div>
          </DragOverlay>
        ) : null}
        {isOver ? <div className={'insert-line'} /> : null}
        {isSelect ? <div className={'drag-handle'} {...listeners}></div> : null}
        {isDragging ? <div className={'drag-mask'} /> : null}
      </div>
    </>
  );
}

export default DisplayWidget;
