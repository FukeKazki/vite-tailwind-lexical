import type {
  DOMConversionMap,
  DOMExportOutput,
  EditorConfig,
  ElementFormatType,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  Spread,
} from 'lexical';

import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import {
  DecoratorBlockNode,
  SerializedDecoratorBlockNode,
} from '@lexical/react/LexicalDecoratorBlockNode';

type YouTubeComponentProps = Readonly<{
  className: Readonly<{
    base: string;
    focus: string;
  }>;
  format: ElementFormatType | null;
  nodeKey: NodeKey;
  videoID: string;
}>;

const YouTubeComponent = ({
  className,
  format,
  nodeKey,
  videoID,
}: YouTubeComponentProps) => {
  return (
    <BlockWithAlignableContents
      className={className}
      format={format}
      nodeKey={nodeKey}
    >
      <iframe
        width="320"
        height="220"
        src={`https://www.youtube.com/embed/${videoID}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
        title="YouTube video"
      />
    </BlockWithAlignableContents>
  );
}

export type SerializedYouTubeNode = Spread<
  {
    videoID: string;
    type: 'youtube';
    version: 1;
  },
  SerializedDecoratorBlockNode
>;

export class YouTubeNode extends DecoratorBlockNode {
  // YoutubeNode が持つデータ
  // YouTube video ID
  __id: string;

  static override getType(): string {
    return 'youtube';
  }

  static override clone(node: YouTubeNode): YouTubeNode {
    return new YouTubeNode(node.__id, node.__format, node.__key);
  }

  // ------- シリアライズ・デシリアライズ -------
  // YouTubeNode の JSON から YouTubeNode を生成する
  static override importJSON(
    serializedNode: SerializedYouTubeNode,
  ): YouTubeNode {
    const node = $createYouTubeNode(serializedNode.videoID);
    node.setFormat(serializedNode.format);
    return node;
  }

  // YouTubeNode を JSON に変換する
  override exportJSON(): SerializedYouTubeNode {
    return {
      ...super.exportJSON(),
      type: 'youtube',
      version: 1,
      videoID: this.__id,
    };
  }

  // YouTubeNode の DOM から YouTubeNode を生成する
  static importDOM(): DOMConversionMap {
    return {
      iframe: () => {
        return {
          conversion: (element: HTMLElement) => {
            const videoId = element.getAttribute('data-youtube-id');
            if (!videoId) return null;
            const node = $createYouTubeNode(videoId);
            return {
              node,
            };
          },
          priority: 0,
        };
      },
    };
  }

  // YouTubeNode を DOM に変換する
  override exportDOM(): DOMExportOutput {
    const element: HTMLDivElement = document.createElement('iframe');

    element.setAttribute('data-youtube-id', this.__id);
    element.setAttribute('src', `https://www.youtube.com/embed/${this.__id}`);
    element.setAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    );
    element.setAttribute('allowFullScreen', 'true');
    element.setAttribute('title', 'YouTube video');
    element.setAttribute('width', '320');
    element.setAttribute('height', '220');

    return {
      element,
    };
  }
  // ------ ここまでシリアライズ・デシリアライズ --------

  constructor(id: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key);
    this.__id = id;
  }

  // YouTubeNode の内容を更新する
  override updateDOM(): false {
    return false;
  }

  getId(): string {
    return this.__id;
  }

  // Markdown に変換したときの文字列を返す
  override getTextContent(): string {
    return `https://www.youtube.com/watch?v=${this.__id}`;
  }

  // Preview に表示する React Element を返す
  override decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: embedBlockTheme.base || '',
      focus: embedBlockTheme.focus || '',
    };
    return (
      <YouTubeComponent
        className={className}
        format={this.__format}
        nodeKey={this.getKey()}
        videoID={this.__id}
      />
    );
  }

  override isInline(): false {
    return false;
  }
}

// LexicalEditor に YouTubeNode を追加する関数
export function $createYouTubeNode(videoID: string): YouTubeNode {
  return new YouTubeNode(videoID);
}

export function $isYouTubeNode(
  node: YouTubeNode | LexicalNode | null | undefined,
): node is YouTubeNode {
  return node instanceof YouTubeNode;
}
