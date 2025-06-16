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
} from "@wordpress/components";
import { registerCoreBlocks } from "@wordpress/block-library";

/**
 * Internal dependencies
 */
import "./wordpress.scss";
import "./other.css";

const EDITOR_MODES = {
  VISUAL: "visual",
  HTML: "html",
  JSON: "json",
};

function App() {
  const [blocks, updateBlocks] = useState([]);
  const [currentMode, setCurrentMode] = useState(EDITOR_MODES.VISUAL);
  const [htmlContent, setHtmlContent] = useState("");
  const [jsonContent, setJsonContent] = useState("");

  useEffect(() => {
    // Override global fetch to mock WordPress API calls for specific endpoints.
    const originalFetch = window.fetch;
    window.fetch = (url, options) => {
      if (typeof url === 'string' && (url.includes('/wp/v2/types') || url.includes('/wp/v2/taxonomies') || url.includes('/wp/v2/media'))) {
        console.log(`Mocking WordPress API call: ${url}`);
        // Return an empty object as a successful response for types and taxonomies.
        // This matches the expected JSON structure for empty collections.
        return Promise.resolve(new Response(JSON.stringify({}), { status: 200 }));
      }
      // For all other requests, use the original fetch function.
      return originalFetch(url, options);
    };

    registerCoreBlocks();

    try {
      // const parsedBlocks = parse(sampleContent);
      if (Array.isArray(jsonSampleContent)) {
        updateBlocks(jsonSampleContent);
        setHtmlContent(sampleContent);
        setJsonContent(JSON.stringify(jsonSampleContent, null, 2));
      } else {
        console.error("Parsed content is not an array:", jsonSampleContent);
        updateBlocks([]);
        setHtmlContent("");
        setJsonContent("[]");
      }
    } catch (error) {
      console.error("Error parsing raw content:", error);
      updateBlocks([]);
      setHtmlContent("");
      setJsonContent("[]");
    }

    // Cleanup the mocked fetch when component unmounts.
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  useEffect(() => {
    if (currentMode === EDITOR_MODES.VISUAL) {
      try {
        // const parsedBlocks = parse(htmlContent);
        if (Array.isArray(jsonSampleContent)) {
          updateBlocks(jsonSampleContent);
        } else {
          console.error(
            "Parsed content from HTML is not an array:",
            jsonSampleContent
          );
          updateBlocks([]);
        }
      } catch (error) {
        console.error("Error parsing HTML content:", error);
        updateBlocks([]);
      }
    } else if (currentMode === EDITOR_MODES.HTML) {
      setHtmlContent(serialize(blocks));
    } else if (currentMode === EDITOR_MODES.JSON) {
      setJsonContent(JSON.stringify(blocks, null, 2));
    }
  }, [currentMode]); // Only re-run when mode changes

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
          updateBlocks(parsedBlocks);
          setJsonContent(JSON.stringify(parsedBlocks, null, 2));
        } else {
          console.error(
            "Parsed content from HTML is not an array:",
            parsedBlocks
          );
          updateBlocks([]);
          setJsonContent("[]");
        }
      } catch (error) {
        console.error("Error parsing HTML content:", error);
        updateBlocks([]);
        setJsonContent("[]");
      }
    } else if (currentMode === EDITOR_MODES.JSON) {
      try {
        const parsedBlocks = JSON.parse(jsonContent);
        if (Array.isArray(parsedBlocks)) {
          updateBlocks(parsedBlocks);
          setHtmlContent(serialize(parsedBlocks));
        } else {
          console.error(
            "Parsed content from JSON is not an array:",
            parsedBlocks
          );
          updateBlocks([]);
          setHtmlContent("");
        }
      } catch (error) {
        console.error("Error parsing JSON content:", error);
        updateBlocks([]);
        setHtmlContent("");
      }
    }
    setCurrentMode(mode);
  };

  return (
    <div className="container">
      <div className="playground  ">
        <SlotFillProvider>
          <div style={{ marginBottom: "10px" }}>
            <__experimentalToggleGroupControl
              label="Editor Mode"
              value={currentMode}
              onChange={setCurrentMode}
              __next40pxDefaultSize={true}
              __nextHasNoMarginBottom={true}
            >
              <__experimentalToggleGroupControlOption
                value={EDITOR_MODES.VISUAL}
                label="Trực quan"
              />
              <__experimentalToggleGroupControlOption
                value={EDITOR_MODES.HTML}
                label="Sửa code (HTML- Gutenburg Markup)"
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
              onInput={updateBlocks}
              onChange={updateBlocks}
              settings={{
                hasFixedToolbar: true,
                focusMode: false,
                // Disable REST API calls
                __experimentalDisableCustomGradients: true,
                __experimentalFeatures: {
                  color: {
                    gradients: false,
                    custom: false,
                    customGradient: false,
                    defaultGradients: false,
                    defaultPalette: false,
                    duotone: false,
                  },
                },
                // Disable post type fetching
                __experimentalFetchLinkSuggestions: false,
                __experimentalFetchReusableBlocks: false,
                __experimentalFetchPostTypes: false,
                __experimentalInternalBlockEditor: { postTypes: [], taxonomies: [] },
              }}
            >
              {/* <div className="playground__sidebar">
              <BlockInspector />
              BlockInspector
            </div> */}
              <div className="playground__content">
                <BlockTools className=" anmBlockTools"></BlockTools>
                <BlockEditorKeyboardShortcuts.Register />
                <div className="editor-styles-wrapper">
                  <WritingFlow>
                    <ObserveTyping>
                      <BlockList />
                    </ObserveTyping>
                  </WritingFlow>
                </div>
                <BlockEditorKeyboardShortcuts />
              </div>
            </BlockEditorProvider>
          )}
        </SlotFillProvider>
      </div>
    </div>
  );
}

export default App;
