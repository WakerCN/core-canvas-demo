import React from 'react';
import { ColumnsWidget as CW } from '../../types/widget';
import CoreCanvas from '../core-canvas';
import './index.less';
import { useDraggable } from '@dnd-kit/core';
import { useEditorContext } from '../../contexts/editor';
import cx from 'classnames';

type Props = {
  data: CW;
};

function ColumnsWidget(props: Props) {
  const { editor, dispatch } = useEditorContext();
  const { data } = props;
  const dragObj = useDraggable({ id: data.id });
  const { setNodeRef, attributes, listeners, active, transform } = dragObj;

  const isSelect = editor.selectWidget === data.id;
  // const style = transform
  //   ? {
  //       zIndex: 999,
  //       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
  //     }
  //   : undefined;

  const handleClick: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    dispatch({ type: 'select', payload: { id: data.id } });
  };

  return (
    <div
      ref={setNodeRef}
      className={cx('columns-widget', { active: isSelect })}
      onClick={handleClick}
      // style={style}
      {...attributes}
    >
      <div className='columns-widget-wrap'>
        {data.canvas.map((canva) => (
          <div key={canva.id} className='columns-widget-item'>
            <CoreCanvas data={canva} />
          </div>
        ))}
      </div>

      {isSelect ? <div className={'drag-handle'} {...listeners}></div> : null}
    </div>
  );
}

export default ColumnsWidget;
