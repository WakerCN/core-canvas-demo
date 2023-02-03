import React, { Reducer, useReducer } from 'react';
import { Editor } from '../types/editor';
import { MOCK } from '../mock/index';
import { dragEnd } from './drag';

export interface EditorAction {
  type: string;
  payload: any;
}

const initEditorData: Editor = {
  selectWidget: null,
  canvas: MOCK.Canvas
};

const initContext = {
  editor: initEditorData,
  dispatch: () => {}
};

const reducer: Reducer<Editor, EditorAction> = (preState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'select': {
      return { ...preState, selectWidget: payload.id };
    }
    case 'dragEnd':
      return { ...preState, canvas: dragEnd(payload, preState.canvas) };
  }
  return preState;
};

export const editorContext = React.createContext<{
  editor: Editor;
  dispatch: React.Dispatch<EditorAction>;
}>(initContext);

export const EditorProvider = ({ children }: { children: any }) => {
  const [editor, dispatch] = useReducer(reducer, initEditorData);
  return (
    <editorContext.Provider value={{ editor, dispatch }}>
      {children}
    </editorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = React.useContext(editorContext);
  if (!context) {
    throw new Error('请在EditorProvider中使用EditorContext');
  }
  return context;
};
