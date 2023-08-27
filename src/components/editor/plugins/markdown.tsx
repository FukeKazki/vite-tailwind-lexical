import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

export const MarkdownPlugin = () => {
  // このプラグインは、Markdownのショートカットを使えるようにするプラグイン
  // transformは、Markdownのショートカットを使うときに、どのように変換するかを指定する
  // HEADING は、# で始まる行を見つけたら、headingに変換する
  return <MarkdownShortcutPlugin transformers={TRANSFORMERS} />;
};
