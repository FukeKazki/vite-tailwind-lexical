import {
  $createParagraphNode,
  EditorConfig,
  ElementNode,
  LexicalNode,
  NodeKey,
  RangeSelection,
} from "lexical";

export class BannerNode extends ElementNode {
  static override getType(): string {
    return "banner";
  }
  constructor(key?: NodeKey) {
    super(key);
  }

  static override clone(node: BannerNode): BannerNode {
    return new BannerNode(node.key);
  }

  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig,
  ): boolean {
    return false;
  }

  override createDOM() {
    const dom = document.createElement("div");
    dom.className =
      "banner bg-green-800 bg-opacity-70 border-l-8 border-green-800 text-white p-3 m-2";
    return dom;
  }

  // 改行する
  override insertNewAfter(
    _selection: RangeSelection,
    restoreSelection?: boolean | undefined,
  ): LexicalNode | null {
    const newBlock = $createParagraphNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.insertAfter(newBlock, restoreSelection);
    return newBlock;
  }

  // 削除する
  override collapseAtStart(): boolean {
    const paragraph = $createParagraphNode();
    const children = this.getChildren();
    children.forEach((child) => {
      paragraph.appendChild(child);
    });
    this.replace(paragraph);
    return true;
  }
}

export const $createBannerNode = () => new BannerNode();
