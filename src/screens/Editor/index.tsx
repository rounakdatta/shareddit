import React, { useState, useEffect } from "react";

import { EditorContextProvider } from "../../contexts/EditorContext";
import { EditorScreenController } from "./controller";

export const EditorScreenProvider: React.FC = () => {
  const [redditParams, setRedditParams] = useState<string>("");
  useEffect(() => {
    if (window) {
      setRedditParams(window.location.search);
    }
  }, []);

  const params = new URLSearchParams(redditParams);

  const subreddit = params.get("sub");
  const postId = params.get("postId");
  const commentId = params.get("commentId");
  const accessToken = params.get("accessToken");

  if (subreddit && postId && accessToken) {
    return (
      <EditorContextProvider>
        <EditorScreenController
          accessToken={accessToken}
          commentId={commentId}
          postId={postId}
          subreddit={subreddit}
        />
      </EditorContextProvider>
    );
  } else {
    return <></>;
  }
};
