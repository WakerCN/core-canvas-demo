import { CoreCanvas } from '../types/canvas';
/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-01-31 16:50 周2
 * @Description  : 模拟数据
 */

const Canvas: CoreCanvas = {
  id: 'canvas-root',
  name: 'core-canvas',
  widgets: [
    {
      id: 'chart-01',
      type: 'display',
      name: 'bar-chart'
    },
    {
      id: 'columns-01',
      type: 'layout',
      name: 'columns',
      canvas: [
        {
          id: 'canvas-01',
          name: 'core-canvas',
          widgets: []
        },
        {
          id: 'canvas-02',
          name: 'core-canvas',
          widgets: [
            {
              id: 'chart-03',
              type: 'display',
              name: 'bar-chart'
            }
          ]
        },
        {
          id: 'canvas-03',
          name: 'core-canvas',
          widgets: [
            {
              id: 'chart-04',
              type: 'display',
              name: 'bar-chart'
            },
            {
              id: 'columns-02',
              type: 'layout',
              name: 'columns',
              canvas: [
                {
                  id: 'canvas-04',
                  name: 'core-canvas',
                  widgets: [
                    {
                      id: 'chart-05',
                      type: 'display',
                      name: 'bar-chart'
                    }
                  ]
                },
                {
                  id: 'canvas-05',
                  name: 'core-canvas',
                  widgets: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'chart-02',
      type: 'display',
      name: 'bar-chart'
    }
  ]
};

export const MOCK = {
  Canvas
};
