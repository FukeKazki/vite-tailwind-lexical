import { useEffect } from "react";
import { TextNode } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createEmoticonNode } from "./emoticon-node";

export default function EmoticonPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(TextNode, (node) => {
      const textContent = node.getTextContent();
      if (textContent === ":hackz:") {
        node.replace($createEmoticonNode("emoticon hackz-emoticon", "h"));
      } else if (textContent === ":)") {
        node.replace($createEmoticonNode("", "🙂"));
      }
    });
    return () => {
      removeTransform();
    };
  }, [editor]);
  return null;
}
