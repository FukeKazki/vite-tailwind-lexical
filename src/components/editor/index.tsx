import { $getRoot, $getSelection, EditorState } from "lexical";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { MarkdownPlugin } from "./plugins/markdown";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import BannerPlugin from "./plugins/banner/banner-plugin";
import { BannerNode } from "./plugins/banner/banner-node";
import { BannerButton } from "./plugins/banner/banner-button";
import YouTubePlugin from "./plugins/youtube/youtube-plugin";
import { YouTubeNode } from "./plugins/youtube/youtube-node";
import { YoutubeButton } from "./plugins/youtube/youtube-button";
import { EmoticonNode } from "./plugins/emoticon/emoticon-node";
import EmoticonPlugin from "./plugins/emoticon/emoticon-plugin";

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
    namespace: "MyEditor",
    // エディタ内の要素にstyleを当てるときにつかう
    theme: {
      heading: {
        h1: "text-5xl font-bold",
        h2: "text-4xl font-bold",
        h3: "text-3xl font-bold",
        h4: "text-2xl font-bold",
      },
      paragraph: "text-body",
      quote: "text-sm italic text-slate-500 border-l-4 border-slate-500 pl-2",
      list: {
        ul: "list-disc list-inside",
        ol: "list-decimal list-inside",
      },
      text: {
        bold: "font-bold",
        italic: "italic",
      },
    },
    nodes: [
      // -- markdown node
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      CodeNode,
      CodeHighlightNode,
      // -- custom node
      BannerNode,
      YouTubeNode,
      EmoticonNode,
    ],
    onError: (error) => console.error(error),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="rounded border p-4 shadow-sm relative">
        <div className="grid grid-flow-col auto-cols-min gap-2">
          <BannerButton />
          <YoutubeButton />
        </div>
        <RichTextPlugin
          // 入力する要素 textarea要素 みたいなもの
          contentEditable={
            <ContentEditable className="min-h-full outline-none" />
          }
          // 入力前に表示されている
          placeholder={
            <div className="pointer-events-none absolute top-9 select-none text-slate-300">
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
      <BannerPlugin />
      <YouTubePlugin />
      <EmoticonPlugin />
    </LexicalComposer>
  );
};
