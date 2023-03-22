import { RedditComment, ListedRawComment } from "../../types/reddit";
import { parseComment } from "./parseComment";

export const parseComments = (
  comments: ListedRawComment[],
  modhash: string
): Array<RedditComment> => {
  const output: Array<RedditComment> = [];
  comments.forEach((item) => {
    if (item.kind === "t1") {
      const commentWithReplies = parseComment(item.data, modhash);
      commentWithReplies != null && output.push(commentWithReplies);
    } else {
      // Comment was a more children object, out of scope for shareddit.
    }
  });
  return output;
};
