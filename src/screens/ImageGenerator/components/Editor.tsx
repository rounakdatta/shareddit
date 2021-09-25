import React, { useContext, useState } from "react";
import * as htmlToImage from "html-to-image";
import { VStack } from "@chakra-ui/layout";

import { RedditContext } from "./RedditContext";
import { DownloadButton } from "./DownloadButton";
import { OptionsModal } from "./OptionsModal";
import {
  Dispatch,
  SetStateAction,
} from "react-router/node_modules/@types/react";
import { SvgAttributes } from "..";

interface EditorProps {
  setSvgData: Dispatch<SetStateAction<SvgAttributes>>;
}

export const Editor: React.FC<EditorProps> = ({ setSvgData }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { downloadAs } = useContext(RedditContext);

  const download = () => {
    const node = document.getElementById("reddit-preview");

    if (node === null) {
      alert(
        "There is an issue with the editor. Can't generate or download image."
      );
      return;
    }

    setLoading(true);
    htmlToImage.toSvg(node).then(async (dataURL) => {
      //@ts-ignore
      const { width, height } = dataURL.match(
        /svg%22%20width%3D%22(?<width>[0-9]*)%22%20height%3D%22(?<height>[0-9]*)%22/
      )?.groups;

      const scale = 960 / width;
      const outputHeight = scale * height;

      dataURL = dataURL.replace(
        /svg%22%20width%3D%22[0-9]*%22%20height%3D%22[0-9]*%22/,
        `svg%22%20width%3D%22${960}%22%20height%3D%22${outputHeight}%22`
      );

      setSvgData({
        uri: dataURL,
        width: 960,
        height: outputHeight,
      });
    });
    setLoading(false);
  };

  return (
    <VStack maxW="lg" marginX="auto" spacing={4}>
      <OptionsModal />
      <DownloadButton download={download} loading={loading} />
    </VStack>
  );
};
