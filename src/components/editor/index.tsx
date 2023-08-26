import { $getRoot, $getSelection, EditorState } from 'lexical';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { MarkdownPlugin } from './plugins/markdown';
import { HeadingNode } from '@lexical/rich-text';

function onChange(editorState: EditorState) {
  editorState.read(() => {
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });
}

export const MyEditor = () => {
  // このエディターの設定
  const initialConfig: InitialConfigType = {
    namespace: 'MyEditor',
    // エディタ内の要素にstyleを当てるときにつかう
    theme: {
      heading: {
        h1: 'text-5xl font-bold',
        h2: 'text-4xl font-bold',
        h3: 'text-3xl font-bold',
        h4: 'text-2xl font-bold',
      },
    },
    nodes: [
      HeadingNode,
    ],
    onError: (error) => console.error(error),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="rounded border p-4 shadow-sm relative">
        <RichTextPlugin
          // 入力する要素 textarea要素 みたいなもの
          contentEditable={
            <ContentEditable className="min-h-full outline-none" />
          }
          // 入力前に表示されている
          placeholder={
            <div className="pointer-events-none absolute top-4 select-none text-slate-300">
              今なにしてる?
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      {/* 入力したときに発火するプラグイン */}
      <OnChangePlugin onChange={onChange} />
      {/* markdownを使えるようにするプラグイン */}
      <MarkdownPlugin />
    </LexicalComposer>
  );
};
