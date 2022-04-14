import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Tag,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Link,
  Box,
} from "@chakra-ui/react";
import moment from "moment";

const Card = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <VStack>
      <Flex
        w={{ base: "90vw", md: "60vw" }}
        justifyContent={{ base: "space-between" }}
        alignItems={{ base: "center" }}
      >
        {/*console.log(children)*/}

        <Box
          bgImage={children.imageUrl}
          bgSize={"cover"}
          bgPos={"center"}
          w={{ base: "100px" }}
          h={{ base: "100px" }}
        />

        <VStack maxW={"450px"} w={{ base: "60vw" }} alignItems={"flex-start"}>
          <Heading
            fontSize={{ base: 14 }}
            overflow={"hidden"}
            maxW={{ base: "30ch" }}
            whiteSpace={{ base: "nowrap" }}
            textOverflow={{ base: "ellipsis" }}
          >
            {children.title}
          </Heading>

          <Flex w={"100%"} justifyContent={"space-between"}>
            <Text size={"lg"} fontStyle={"italic"}>
              {moment(children.publishedAt).format("L")}
            </Text>

            <Text size={"lg"} as={"u"} color="#302E53">
              {children.newsSite}
            </Text>
          </Flex>

          <Text display={{ base: "none", md: "block" }}>
            {children.summary}
          </Text>

          <Button
            color={"#fff"}
            bgColor={"#302E53"}
            _hover={{ filter: "brightness(1.1)" }}
            onClick={onOpen}
          >
            Ver mais
          </Button>
        </VStack>
      </Flex>

      {/* MODAL */}
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Flex
              w={{ base: "100%" }}
              h={{ base: "auto" }}
              justifyContent={{ base: "space-between" }}
              alignItems={{ base: "center" }}
              flexDir={{ base: "column", md: "row" }}
            >
              {/*console.log(children)*/}

              <Box
                bgImage={children.imageUrl}
                bgSize={"cover"}
                bgPos={"center"}
                w={{ base: "180px" }}
                h={{ base: "120px" }}
              />

              <VStack
                maxW={"450px"}
                w={{ base: "60vw" }}
                alignItems={"flex-start"}
                mt={4}
              >
                <Heading
                  fontSize={{ base: 14 }}
                  overflow={"hidden"}
                  maxW={{ base: "30ch", md: "full" }}
                  whiteSpace={{ base: "nowrap", md: "normal" }}
                  textOverflow={{ base: "ellipsis" }}
                >
                  {children.title}
                </Heading>

                <Flex w={"100%"} justifyContent={"space-between"}>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontStyle={"italic"}
                  >
                    {moment(children.publishedAt).format("L")}
                  </Text>
                </Flex>

                <Text fontSize={{ base: "sm", md: "md" }}>
                  {children.summary}
                </Text>
              </VStack>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent={{ base: "center" }}>
            <Link href={children.url}>
              <Button
                color={"#fff"}
                bgColor={"#D07017"}
                _hover={{ filter: "brightness(1.1)" }}
              >
                Ir para o site
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};
export default Card;
