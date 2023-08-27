import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback } from "react";
import { INSERT_BANNER_COMMAND } from "./banner-plugin";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const BannerButton = () => {
  const [editor] = useLexicalComposerContext();
  const embedBanner = useCallback(() => {
    editor.dispatchCommand(INSERT_BANNER_COMMAND, "");
  }, [editor]);
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            onClick={embedBanner}
            aria-label="embed banner"
            className="hover:opacity-40 focus-visible:opacity-40 duration-200 text-xl fill-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>
          </TooltipTrigger>
          <TooltipContent>
            <p>Banner</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
