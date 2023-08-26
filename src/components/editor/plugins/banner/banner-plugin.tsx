import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { useEffect } from "react";
import { $createBannerNode, BannerNode } from "./banner-node";

export const INSERT_BANNER_COMMAND: LexicalCommand<string> = createCommand(
  "INSERT_BANNER_COMMAND",
);

export default function BannerPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([BannerNode])) {
      throw new Error("BannerPlugin: BannerNode not registered on editor");
    }

    return editor.registerCommand<string>(
      INSERT_BANNER_COMMAND,
      () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, $createBannerNode);
        }
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
