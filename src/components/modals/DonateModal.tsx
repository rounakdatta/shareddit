import React from "react";
import { FaHeart } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/modal";
import KofiButton from "kofi-button";
import { Center, Text, SimpleGrid, Box, VStack } from "@chakra-ui/react";
import ReactGA from "react-ga";

import { StyledButton } from "../input/buttons/StyledButton";

export const DonateModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickHandler = () => {
    onOpen();
    ReactGA.event({
      category: "General Engagement",
      action: "Opened Donate Modal",
    });
  };

  return (
    <StyledButton onClick={onClickHandler}>
      <SimpleGrid
        paddingLeft={2}
        columns={3}
        columnGap={2}
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Center>
          <Text>support the project</Text>
          <Box width={2} />
          <FaHeart size={30} color="#CC3300" />
        </Center>
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent margin={12}>
          <ModalHeader>Hi, I'm Logan.</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} alignItems="left">
              <Text>
                Thank you for using shareddit! The single best way you can
                support the project is to spread the word! If you want to see
                more from me and keep shareddit ad-free, please consider
                donating on Ko-fi. As a busy computer science student, I
                sincerely appreciate every visitor and any amount of support
                you're able to provide. Thanks again and have a great day!
              </Text>
              <SimpleGrid
                paddingLeft={2}
                columns={3}
                columnGap={2}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: 12,
                }}
              >
                <Center>
                  <KofiButton
                    color="#0a9396"
                    title="Donate"
                    kofiID="N4N31JDNX"
                  />
                </Center>
              </SimpleGrid>
            </VStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </StyledButton>
  );
};
