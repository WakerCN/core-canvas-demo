import { BarChartWidget, ColumnsWidget } from './widget';

export type AllWidgetType = BarChartWidget | ColumnsWidget;

/**
 * 画布
 * ！！！要实现嵌套
 */
export interface CoreCanvas {
  /** 画布实例 */
  id: string;
  name: 'core-canvas';
  widgets: Array<AllWidgetType>;
}
