/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-01-31 17:15 周2
 * @Description  :
 */

import { useDroppable } from '@dnd-kit/core';
import cx from 'classnames';
import { CoreCanvas as CoreCanvasData } from '../../types/canvas';
import { ColumnsWidget as CW, DisplayWidget as DW } from '../../types/widget';
import ColumnsWidget from '../columns-widget';
import DisplayWidget from '../display-widget';
import './index.less';

interface CoreCanvasProps {
  /** 画布数据 */
  data: CoreCanvasData;
}

function CoreCanvas(props: CoreCanvasProps) {
  const { data } = props;
  const { widgets } = data;
  const { isOver, setNodeRef } = useDroppable({ id: data.id, data });

  /** 画布渲染方法 */
  const render = () => {
    return (
      <div ref={setNodeRef} className={cx('core-canvas', { over: isOver })}>
        {widgets.map((widget) => {
          return widget.type === 'display' ? (
            renderDisplayWidget(widget)
          ) : widget.name === 'columns' ? (
            renderColumnsWidget(widget)
          ) : (
            <div key={'empty'}>无匹配的渲染组件</div>
          );
        })}
      </div>
    );
  };

  /** 渲染显示组件 */
  const renderDisplayWidget = (widget: DW) => {
    return <DisplayWidget key={widget.id} data={widget} />;
  };

  /** 渲染分栏组件 */
  const renderColumnsWidget = (widget: CW) => {
    return <ColumnsWidget key={widget.id} data={widget} />;
  };

  return render();
}

export default CoreCanvas;
