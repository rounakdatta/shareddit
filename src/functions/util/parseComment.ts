import { RedditComment, RawComment } from "../../types/reddit";
import { parseAwards } from "./parseAwards";
import { parseComments } from "./parseComments";
import { parseDate } from "./parseDate";
import { parseFlair } from "./parseFlair";
import { parseScore } from "./parseScore";

export const parseComment = (
  comment: RawComment,
  modhash: string
): RedditComment | null => {
  const replies = comment.replies
    ? parseComments(comment.replies.data.children, modhash)
    : [];

    // if neither the comment or any of its children are not liked, we skip it
    if (comment.likes == null && replies.length === 0) {
      return null
    }
  return {
    ...comment,
    type: "comment",
    date: parseDate(comment.created, true),
    scoreString: parseScore(comment.score),
    flair: parseFlair(
      comment.author_flair_richtext,
      comment.author_flair_text_color,
      comment.author_flair_background_color
    ),
    modhash,
    replyTree: replies,
    awardCount: parseAwards(comment.all_awardings),
  };
};
