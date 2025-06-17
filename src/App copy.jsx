import React from "react";
import { parse, serialize } from "@wordpress/blocks";
import sampleContent, { jsonSampleContent } from "./sample_data/content_sample";

/**
 * WordPress dependencies
 */
import { useEffect, useState } from "@wordpress/element";
import {
  BlockEditorKeyboardShortcuts,
  BlockEditorProvider,
  BlockList,
  BlockTools,
  WritingFlow,
  ObserveTyping,
} from "@wordpress/block-editor";
import {
  SlotFillProvider,
  __experimentalToggleGroupControl,
  __experimentalToggleGroupControlOption,
  Popover,
} from "@wordpress/components";
import { registerCoreBlocks } from "@wordpress/block-library";
import { dispatch, useSelect, createRegistry, RegistryProvider } from "@wordpress/data";
import "@wordpress/format-library";

/**
 * Internal dependencies
 */
import "./wordpress.scss";
import "./other.css";

registerCoreBlocks();

const EDITOR_MODES = {
  VISUAL: "visual",
  HTML: "html",
  JSON: "json",
};

function App() {
  const [currentMode, setCurrentMode] = useState(EDITOR_MODES.VISUAL);
  const [htmlContent, setHtmlContent] = useState("");
  const [jsonContent, setJsonContent] = useState("");
  const [selectedBlockIds, setSelectedBlockIds] = useState([]);
  const [blocks, setBlocks] = useState([]);

  const selectedBlocks = useSelect((select) =>
    select("core/block-editor").getSelectedBlockClientIds()
  , [] );

  useEffect(() => {
    // Override global fetch to mock WordPress API calls for specific endpoints.
    const originalFetch = window.fetch;
    window.fetch = (url, options) => {
      if (
        typeof url === "string" &&
        (url.includes("/wp/v2/types") ||
          url.includes("/wp/v2/taxonomies") ||
          url.includes("/wp/v2/media"))
      ) {
        // Return an empty object as a successful response for types and taxonomies.
        // This matches the expected JSON structure for empty collections.
        return Promise.resolve(
          new Response(JSON.stringify({}), { status: 200 })
        );
      }
      // For all other requests, use the original fetch function.
      return originalFetch(url, options);
    };

    try {
      // const parsedBlocks = parse(sampleContent);
      if (Array.isArray(jsonSampleContent)) {
        setBlocks(jsonSampleContent);
        setHtmlContent(serialize(jsonSampleContent));
        setJsonContent(JSON.stringify(jsonSampleContent, null, 2));
      } else {
        console.error("Parsed content is not an array:", jsonSampleContent);
        setBlocks([]);
        setHtmlContent("");
        setJsonContent("");
      }
    } catch (error) {
      console.error("Error parsing raw content:", error);
      setBlocks([]);
      setHtmlContent("");
      setJsonContent("");
    }

    // Cleanup the mocked fetch when component unmounts.
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  useEffect(() => {
    if (blocks.length > 0) {
      dispatch('core/block-editor').selectBlock(blocks[0].clientId);
    }
  }, [blocks]);

  useEffect(() => {
  }, [selectedBlockIds, selectedBlocks]);

  const handleHtmlChange = (event) => {
    setHtmlContent(event.target.value);
  };

  const handleJsonChange = (event) => {
    setJsonContent(event.target.value);
  };

  const setMode = (mode) => () => {
    // Before switching, update the content of the mode we are leaving
    if (currentMode === EDITOR_MODES.VISUAL) {
      setHtmlContent(serialize(blocks));
      setJsonContent(JSON.stringify(blocks, null, 2));
    } else if (currentMode === EDITOR_MODES.HTML) {
      try {
        const parsedBlocks = parse(htmlContent);
        if (Array.isArray(parsedBlocks)) {
          setBlocks(parsedBlocks);
          setJsonContent(JSON.stringify(parsedBlocks, null, 2));
        } else {
          console.error(
            "Parsed content from HTML is not an array:",
            parsedBlocks
          );
          setBlocks([]);
          setJsonContent("");
        }
      } catch (error) {
        console.error("Error parsing HTML content:", error);
        setBlocks([]);
        setJsonContent("");
      }
    } else if (currentMode === EDITOR_MODES.JSON) {
      try {
        const parsedBlocks = JSON.parse(jsonContent);
        if (Array.isArray(parsedBlocks)) {
          setBlocks(parsedBlocks);
          setHtmlContent(serialize(parsedBlocks));
        } else {
          console.error(
            "Parsed content from JSON is not an array:",
            parsedBlocks
          );
          setBlocks([]);
          setHtmlContent("");
        }
      } catch (error) {
        console.error("Error parsing JSON content:", error);
        setBlocks([]);
        setHtmlContent("");
      }
    }
    setCurrentMode(mode);
  };

  const handleInput = (newBlocks) => {
    setBlocks(newBlocks);
  };

  const handleChange = (newBlocks) => {
    // This is called when changes are committed, e.g., on blur or after a significant change.
    // You might want to save the content here.
    // For now, we'll just log it.
  };

  return (
    <div className="container">
      <div className="playground  ">
        <SlotFillProvider>
         
            <div style={{ marginBottom: "10px" }}>
              <__experimentalToggleGroupControl
                label="Editor Mode"
                value={currentMode}
                onChange={(mode) => setMode(mode)()}
                __next40pxDefaultSize={true}
                __nextHasNoMarginBottom={true}
              >
                <__experimentalToggleGroupControlOption
                  value={EDITOR_MODES.VISUAL}
                  label="Trực quan"
                />
                <__experimentalToggleGroupControlOption
                  value={EDITOR_MODES.HTML}
                  label="HTML- Gutenburg Markup"
                />
                <__experimentalToggleGroupControlOption
                  value={EDITOR_MODES.JSON}
                  label="Gutenburg JSON"
                />
              </__experimentalToggleGroupControl>
            </div>
            {currentMode === EDITOR_MODES.HTML ? (
              <textarea
                style={{ width: "100%", height: "500px", padding: "10px" }}
                value={htmlContent}
                onChange={handleHtmlChange}
              />
            ) : currentMode === EDITOR_MODES.JSON ? (
              <textarea
                style={{ width: "100%", height: "500px", padding: "10px" }}
                value={jsonContent}
                onChange={handleJsonChange}
              />
            ) : (
              <BlockEditorProvider
                value={blocks}
                onInput={setBlocks}
                onChange={setBlocks}
              >
                <div className="playground__content">
                  <BlockEditorKeyboardShortcuts.Register />
                  <BlockEditorKeyboardShortcuts />
                  <div className="editor-styles-wrapper">
                    <WritingFlow>
                      <ObserveTyping>
                        <BlockTools className=" anmBlockTools">
                          <BlockList />
                        </BlockTools>
                      </ObserveTyping>
                    </WritingFlow>
                  </div>
                </div>
                <Popover.Slot />
              </BlockEditorProvider>
            )}
        </SlotFillProvider>
      </div>
    </div>
  );
}

export default App;