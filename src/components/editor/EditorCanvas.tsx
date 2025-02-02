import { Flex, FlexProps, Spinner } from "@chakra-ui/react";
import React from "react";

import { useEditorData } from "../../contexts/EditorContext";
import { lightTheme } from "../../styles/themes";
import {
  RedditSubmission,
  RedditComment,
  MoreChildren,
} from "../../types/reddit";
import { Paragraph, Title } from "../typography";
import { CommentHeader } from "./CommentHeader";
import { RootComment } from "./templates/comments/RootComment";
import { Submission } from "./templates/submissions/Submission";
import { ViaShareddit } from "./ViaShareddit";

interface EditorCanvasProps extends FlexProps {
  isLoading: boolean;
  isError: boolean;
  submission: RedditSubmission | undefined;
  comments: (RedditComment | MoreChildren)[] | undefined;
  postId: string
}

export const EditorCanvas: React.FC<EditorCanvasProps> = ({
  submission,
  comments,
  isLoading,
  isError,
  postId,
  ...props
}) => {
  const { theme, showComments, topLevelComments } = useEditorData();
  const backgroundColor = theme.background["100"];
  const align = !isLoading && !isError ? "left" : "center";
  const justify = !isLoading && !isError ? "left" : "center";
  const commentsBeingShown = Boolean(comments?.length && showComments);

  return (
    <Flex
      alignItems="center"
      borderRadius="8px"
      direction="column"
      maxWidth="100vw"
    >
      <Title height="32px">Image Preview</Title>
      <Flex
        align={align}
        backgroundColor={backgroundColor}
        data-post-id={postId}
        height="100%"
        id="reddit-preview"
        justify={justify}
        textAlign="left"
        {...props}
      >
        <Flex direction="column" gap="8px">
          {submission && (
            <>
              <Submission
                commentsBeingShown={commentsBeingShown}
                submission={submission}
              />
              <ViaShareddit />
            </>
          )}
          {comments && showComments && (
            <>
              <CommentHeader />
              {comments.slice(0, topLevelComments).map((comment) => (
                <RootComment data={comment} key={comment.id} />
              ))}
            </>
          )}
        </Flex>
        {isLoading && <Spinner />}
        {isError && (
          <Paragraph color={lightTheme.accents[100]}>
            Something went wrong 😔
          </Paragraph>
        )}
      </Flex>
    </Flex>
  );
};
