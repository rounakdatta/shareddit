import { Box, propNames } from "@chakra-ui/react";
import React, { useContext } from "react";

import { ImageTheme } from "../types";
import { RedditContext } from "./RedditContext";
import templates from "./templates";

type RedditThemePropertyMap<T> = {
  [key in ImageTheme]: T;
};

export const Template: React.FC = () => {
  const data = useContext(RedditContext);
  const { darkMode } = data;
  const { TitleTemplate, CommentTemplate } = templates(data.content.type);
  return (
    <Box padding="10px" borderRadius="12px" id="reddit-preview">
      <Box
        style={{
          display: "flex",
          borderRadius: "12px",
          borderWidth: 1,
          color: darkMode ? "#FFFFFF" : "#001219",
          backgroundColor: darkMode ? "#001219" : "#FFFFFF",
          borderColor: darkMode ? "#AAAAAA" : "#AAAAAA",
          padding: 8,
          flexDirection: "column",
          fontFamily: "sans",
          width: "100%",
          fontSize: 16,
        }}
      >
        <TitleTemplate {...data.content} />
        {data.content.comments ? (
          <CommentTemplate {...data.content.comments} />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
