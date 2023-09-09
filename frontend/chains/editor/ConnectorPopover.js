import React, { useContext, useCallback } from "react";
import {
  Badge,
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { SelectedNodeContext } from "chains/editor/contexts";
import { useEditorColorMode } from "chains/editor/useColorMode";

const DEFAULT_DESCRIPTION =
  "Attach components to this connector by dragging them from the search results in the left panel.";

export const ConnectorPopover = ({
  type,
  node,
  connector,
  label,
  placement,
  children,
}) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { highlight } = useEditorColorMode();
  const { setSelectedConnector } = useContext(SelectedNodeContext);

  const source_types = Array.isArray(connector.source_type)
    ? connector.source_type
    : [connector?.source_type];

  const description = connector.description || DEFAULT_DESCRIPTION;

  const onClick = useCallback(
    (event) => {
      // click: search for components
      // shift-click: toggle help
      const shiftKey = event.shiftKey;
      if (shiftKey) {
        onToggle();
      } else {
        setSelectedConnector({ type, node, connector });
      }
    },
    [onToggle]
  );

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      placement={placement}
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <Box as="button" onClick={onClick} title={"shift-click for help"}>
          {children || label || connector.key}
        </Box>
      </PopoverTrigger>
      <PopoverContent zIndex={99999} color={"white"}>
        <PopoverArrow />
        <PopoverHeader>
          {source_types?.map((type) => {
            return (
              <Badge px={2} mr={1} bg={highlight[type]} key={type}>
                {type}
              </Badge>
            );
          })}
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>{description}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

ConnectorPopover.defaultProps = {
  placement: "left",
};
