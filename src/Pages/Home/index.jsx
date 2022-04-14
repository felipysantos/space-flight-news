import {
  Button,
  Center,
  HStack,
  Input,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../../Components/Card";
import Api from "../../Services/api";

const Home = () => {
  // PESQUISA
  const [isSearch, setSearch] = useState("");

  // CARREGAMENTO
  const [isLoading, setLoading] = useState(true);

  // ERROR DE REQUISIÇÃO
  const [isError, setError] = useState([]);

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
          element.title.toLowerCase().includes(value.toLowerCase()) ||
          element.summary.toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredNews(filteredItem);
  };

  return (
    <VStack spacing={10} mb={100}>
      <Center
        w={"100vw"}
        h={"80px"}
        justifyContent={{ base: "center", lg: "flex-end" }}
        px={8}
      >
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
            Search
          </Button>
        </HStack>
      </Center>

      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#302E53"
          size="xl"
        />
      ) : isFilteredNews.length !== 0 ? (
        isFilteredNews.map((parentElement) =>
          parentElement.map((element) => (
            <Card key={element.id}>{element}</Card>
          ))
        )
      ) : (
        isNews &&
        isNews.map((parentElement) =>
          parentElement.map((element) => (
            <Card key={element.id}>{element}</Card>
          ))
        )
      )}

      <Button
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
