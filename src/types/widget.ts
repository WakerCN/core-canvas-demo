import { CoreCanvas } from './canvas';

/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-01-31 16:46 周2
 * @Description  :
 */
export type WidgetName = 'bar-chart' | 'line-chart' | 'columns' | 'tab';

/** 部件 */
export interface Widget {
  /** 部件实例id */
  id: string;

  /**
   * 部件分类
   *    显示部件 | 布局部件
   */
  type: 'display' | 'layout';

  /** 部件身份标识，用来确定是那一种部件 */
  name: WidgetName;
}

/** 显示部件 */
export interface DisplayWidget extends Widget {
  type: 'display';
}

/** 布局部件 */
export interface LayoutWidget extends Widget {
  type: 'layout';
}

/** 柱状图部件 */
export interface BarChartWidget extends DisplayWidget {
  name: 'bar-chart';
}

/** 分栏组件 */
export interface ColumnsWidget extends LayoutWidget {
  name: 'columns';
  /** 分栏下的单元画布 */
  canvas: CoreCanvas[];
}
