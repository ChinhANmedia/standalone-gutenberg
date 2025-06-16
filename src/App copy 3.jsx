import React from "react";
import { parse } from "@wordpress/blocks";
import sampleContent from "./sample_data/content_sample";
/**
 * WordPress dependencies
 */
import { useEffect, useState } from "@wordpress/element";
import {
  BlockEditorKeyboardShortcuts,
  BlockEditorProvider,
  BlockList,
  BlockTools,
  BlockInspector,
  WritingFlow,
  ObserveTyping,
} from "@wordpress/block-editor";
import { Popover, SlotFillProvider } from "@wordpress/components";
import { registerCoreBlocks } from "@wordpress/block-library";
import "@wordpress/format-library";

/**
 * Internal dependencies
 */
import "./wordpress.scss";
import "./other.css";
function App() {
  const [blocks, updateBlocks] = useState([]);

  useEffect(() => {
    registerCoreBlocks();
    try {
      const parsedBlocks = parse(sampleContent);
      if (Array.isArray(parsedBlocks)) {
        updateBlocks(parsedBlocks);
      } else {
        console.error("Parsed content is not an array:", parsedBlocks);
        updateBlocks([]);
      }
    } catch (error) {
      console.error("Error parsing raw content:", error);
      updateBlocks([]);
    }
  }, []);

  return (
    <div className="container">
      <div className="playground  ">
        <SlotFillProvider>
          SlotFillProvider
          <BlockEditorProvider
            value={blocks}
            onInput={updateBlocks}
            onChange={updateBlocks}
          >
            BlockEditorProvider
            {/* <div className="playground__sidebar">
          <BlockInspector />
          BlockInspector
        </div> */}
            <div className="playground__content">
              <BlockEditorKeyboardShortcuts.Register />
              BlockEditorKeyboardShortcuts.Register
              <BlockEditorKeyboardShortcuts />
              BlockEditorKeyboardShortcuts
              <div className="editor-styles-wrapper">
                <WritingFlow>
                  WritingFlow
                  <ObserveTyping>
                    ObserveTyping
                    <BlockTools className=" anmBlockTools">
                      <BlockList />
                      BlockList
                    </BlockTools>
                  </ObserveTyping>
                  ObserveTyping
                </WritingFlow>
              </div>
            </div>
            <Popover.Slot />
            Popover.Slot
          </BlockEditorProvider>
        </SlotFillProvider>
      </div>
    </div>
  );
}

export default App;
