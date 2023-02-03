import { CoreCanvas } from './canvas';

export interface Editor {
  /** 选中元素的Id */
  selectWidget: string | null;
  /** 画布数据 */
  canvas: CoreCanvas;
}
