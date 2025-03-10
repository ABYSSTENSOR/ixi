import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  stackoverflowDark,
  stackoverflowLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";

import { SCROLLBAR_CSS } from "site/css";

export const ExecutionDetail = ({ execution }) => {
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";
  const syntaxTheme = isLight ? stackoverflowLight : stackoverflowDark;
  const messageStyle = isLight
    ? { color: "#222", bg: "#f6f6f6" }
    : { color: "white", bg: "#1c1b1b" };

  const formattedInputs =
    typeof execution?.inputs === "string"
      ? execution?.inputs
      : JSON.stringify(execution?.inputs, null, 4);
  const formattedOutputs =
    typeof execution?.outputs === "string"
      ? execution?.outputs
      : JSON.stringify(execution?.outputs, null, 4);

  const syntaxStyle = {
    fontSize: "12px",
    maxWidth: "900px",
    margniRight: "5px",
  };

  return (
    <Box pl={4} pt={1} height={"100%"}>
      <VStack alignItems={"start"} spacing={3}>
        <Box width={"100%"}>
          <Heading size={"sm"} mb={1}>
            Input
          </Heading>
          <SyntaxHighlighter
            customStyle={syntaxStyle}
            language="json"
            style={syntaxTheme}
            wrapLines={true}
          >
            {formattedInputs}
          </SyntaxHighlighter>
        </Box>
        <Box width={"100%"}>
          <Heading size={"sm"} mb={1}>
            Output
          </Heading>
          <SyntaxHighlighter
            customStyle={syntaxStyle}
            language="json"
            style={syntaxTheme}
            wrapLines={true}
          >
            {formattedOutputs}
          </SyntaxHighlighter>
        </Box>
        {execution?.message && (
          <Box width={"100%"}>
            <Heading size={"sm"} mb={1}>
              Message
            </Heading>
            <Box {...messageStyle} minW={300} minH={100} p={2}>
              <code>{execution?.message || "<no message>"}</code>
            </Box>
          </Box>
        )}
      </VStack>
    </Box>
  );
};
