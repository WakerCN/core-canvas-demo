import { DragEndEvent } from '@dnd-kit/core';
import { AllWidgetType, CoreCanvas } from '../types/canvas';
import _ from 'lodash';

/** 解析当前drag Info，根据info，生成新画布json */
export const dragEnd = (
  payload: {
    active: DragEndEvent['active'];
    over: DragEndEvent['over'];
  },
  preCanvas: CoreCanvas
): CoreCanvas => {
  const { active, over } = payload;
  // 删除active组件
  // 找到over组件的地方，在over的后面插入active

  /*
   * 这里分几种情况
   *  1.拖拽到display/布局组件
   *  2.拖拽到画布上
   */

  /*
   * 情况1：组件拖拽到其他组件上，则在target组件下方添加当前组件
   */
  let canvas = _.cloneDeep(preCanvas);
  if (over) {
    console.log('over.id: ', over);
    console.log('preCanvas: ', preCanvas);
    const addWidget = getWidgetById(String(active.id), canvas);
    if (over.data.current?.name === 'core-canvas') {
      console.log('拖拽到画布中');
      deletNodeFormCanvas(String(active.id), canvas);
      addNodeToCanvas(String(over.id), canvas, addWidget!);
      return canvas;
    } else {
      deletNodeFormCanvas(String(active.id), canvas);
      addNodeToWidgetBottom(String(over.id), canvas, addWidget!);
    }
  }
  return canvas;
};

/**
 * 根据组件id查找对饮在画布上的widgetJson
 *
 * @param id 组件id
 * @param canvas 查找的画布
 * @returns 组件
 */
const getWidgetById = (
  id: string,
  canvas: CoreCanvas
): AllWidgetType | null => {
  let result: AllWidgetType | null = null;

  for (let i = 0; i < canvas.widgets.length; i++) {
    const widget = canvas.widgets[i];
    if (widget.id === id) {
      return widget;
    }
    if (widget.name === 'columns') {
      for (let k = 0; k < widget.canvas.length; k++) {
        const canva = widget.canvas[k];
        result = getWidgetById(id, canva);
        if (result) {
          return result;
        }
      }
    }
  }
  return result;
};

const deletNodeFormCanvas = (id: string, canvas: CoreCanvas) => {
  for (let i = 0; i < canvas.widgets.length; i++) {
    const widget = canvas.widgets[i];
    if (widget.id === id) {
      canvas.widgets = canvas.widgets.filter((w) => w.id !== id);
      return canvas;
    }
    if (widget.name === 'columns') {
      for (let j = 0; j < widget.canvas.length; j++) {
        const canva = widget.canvas[j];
        deletNodeFormCanvas(id, canva);
        widget.canvas[j] = canva;
      }
    }
  }
};

/**
 * 将添加的元素添加到目标元素的下方
 *
 * @param id 目标元素id
 * @param canvas 画布
 * @param addWidget 添加元素
 * @returns
 */
const addNodeToWidgetBottom = (
  id: string,
  canvas: CoreCanvas,
  addWidget: AllWidgetType
) => {
  for (let i = 0; i < canvas.widgets.length; i++) {
    const widget = canvas.widgets[i];
    if (widget.id === id) {
      const index = canvas.widgets.findIndex((w) => w.id === id);
      canvas.widgets.splice(index + 1, 0, addWidget);
      return canvas;
    }
    if (widget.name === 'columns') {
      for (let j = 0; j < widget.canvas.length; j++) {
        const canva = widget.canvas[j];
        addNodeToWidgetBottom(id, canva, addWidget);
        widget.canvas[j] = canva;
      }
    }
  }
};

const addNodeToCanvas = (
  id: string,
  canvas: CoreCanvas,
  addWidget: AllWidgetType
) => {
  if (canvas.id === id) {
    canvas.widgets.push(addWidget);
    return canvas;
  }
  for (let i = 0; i < canvas.widgets.length; i++) {
    const widget = canvas.widgets[i];
    if (widget.name === 'columns') {
      for (let j = 0; j < widget.canvas.length; j++) {
        const canva = widget.canvas[j];
        addNodeToCanvas(id, canva, addWidget);
        widget.canvas[j] = canva;
      }
    }
  }
};
