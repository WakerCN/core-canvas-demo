/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-01-31 16:42 周2
 * @Description  :
 */
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useReducer } from 'react';
import CoreCanvas from './components/core-canvas';
import './index.less';
import { MOCK } from './mock';
import { useEditorContext } from './contexts/editor';

function App() {
  const context = useEditorContext();
  const { editor, dispatch } = context;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // 将active元素放置到over元素处
    dispatch({ type: 'dragEnd', payload: { active, over } });
  };

  return (
    <div
      className='root-canvas'
      onClick={() => {
        dispatch({ type: 'select', payload: { id: null } });
      }}
    >
      <DndContext onDragEnd={handleDragEnd}>
        <CoreCanvas data={editor.canvas} />
      </DndContext>
    </div>
  );
}

export default App;
