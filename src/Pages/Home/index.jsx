import {
  Button,
  Center,
  Heading,
  HStack,
  Input,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { FaRocket } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../../Components/Card";
import Api from "../../Services/api";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
  // FRAMER MOTION
  const MotionDiv = motion.div;
  // PESQUISA
  const [isSearch, setSearch] = useState("");

  // CARREGAMENTO
  const [isLoading, setLoading] = useState(true);

  // ERROR DE REQUISIÇÃO
  const [isError, setError] = useState([]);

  // ERROR DE FILTRO
  const [isFilteredError, setFilteredError] = useState([
    {
      messageError: "Nenhum item encontrado",
    },
  ]);

  // NOTICIAS
  const [isNews, setNews] = useState([]);

  // FILTRAR ITENS PESQUISADOS
  const [isFilteredNews, setFilteredNews] = useState([]);

  // FILTRAR ITENS PESQUISADOS
  const [isNumber, setNumber] = useState(0);

  // BUSCAR DADOS
  useEffect(() => {
    Api.get(`?_limit=10&_start=${isNumber}`)
      .then((data) => {
        setNews([...isNews, data.data]);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, [isNumber]);

  // FUNÇÃO PARA FILTRAR OS ITENS
  const showResults = (value) => {
    const filteredItem = isNews.map((parentElement) =>
      parentElement.filter(
        (element) =>
          element.title.toLowerCase().includes(value.toLowerCase()) &&
          element.summary.toLowerCase().includes(value.toLowerCase())
      )
    );
    filteredItem[0].length !== 0
      ? setFilteredNews(filteredItem)
      : setFilteredNews([isFilteredError]);
  };


  return (
    <VStack bgColor={"#fff"} minW={"375px"} spacing={10} mb={100}>
      <Center
        w={{ base: "100vw", md: "70vw" }}
        minH={"80px"}
        justifyContent={{ base: "center", lg: "space-between" }}
        flexDir={{ base: "column", md: "row" }}
        px={8}
      >
        <HStack minH={"80px"} color={"#D07017"} fontSize={{ base: "26px" }}>
          <FaRocket />
          <Heading>Space Flight</Heading>
        </HStack>
        <HStack
          p={2}
          borderRadius={8}
          maxW={"500px"}
          display={"flex"}
          border={"2px solid #bdbdbd"}
          _focusWithin={{ border: "2px solid #1E2022" }}
        >
          <Input
            _focus={{}}
            border={{}}
            maxW={"375px"}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            color={"#fff"}
            bgColor={"#302E53 "}
            _hover={{ filter: "brightness(1.1)" }}
            onClick={() => showResults(isSearch)}
          >
            Pesquisar
          </Button>
        </HStack>
      </Center>

      <AnimatePresence>
        {isLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#302E53"
            size="xl"
            my={10}
          />
        ) : isFilteredNews.length !== 0 ? (
          isFilteredNews.map((parentElement) =>
            parentElement.map((element, index) => (
              <MotionDiv
                variants={{
                  hidden: {
                    opacity: 0,
                    x: 100,
                  },
                  visible: (index) => ({
                    opacity: 1,
                    x: 0,
                    transition: {
                      delay: index * 0.15,
                    },
                  }),
                }}
                custom={index}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.75 }}
              >
                {element.messageError ? (
                  <Heading>{element.messageError}</Heading>
                ) : (
                  <Card key={element.id}>{element}</Card>
                )}
              </MotionDiv>
            ))
          )
        ) : (
          isNews &&
          isNews.map((parentElement) =>
            parentElement.map((element, index) => (
              <MotionDiv
                variants={{
                  hidden: {
                    opacity: 0,
                    x: 100,
                  },
                  visible: (index) => ({
                    opacity: 1,
                    x: 0,
                    transition: {
                      delay: index * 0.15,
                    },
                  }),
                }}
                custom={index}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.75 }}
              >
                <Card key={element.id}>{element}</Card>
              </MotionDiv>
            ))
          )
        )}
      </AnimatePresence>
      <Button
        isLoading={isLoading}
        color={"#fff"}
        bgColor={"#302E53 "}
        _hover={{ filter: "brightness(1.1)" }}
        onClick={() => {
          setNumber(isNumber + 10);
        }}
      >
        Carregar mais notícias
      </Button>
    </VStack>
  );
};

export default Home;
