import { Container, Text, VStack ,Flex, SimpleGrid  } from '@chakra-ui/react'
import React, { useState ,useEffect } from 'react'
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import axios from 'axios'

const Homepage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products") 
      .then((res) => {
        console.log(res);
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));
};
const handleUpdateProduct = (updatedProduct) => {
  setProducts((prevProducts) =>
      prevProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
      )
  );
};

  return (
    <Container maxW={"container.xl"} py={12} >
      <VStack spacing={8}>
        <Text 
         fontSize={"30"}
         fontWeight={"bold"}
         textAlign={'center'}
         bgGradient={"linear(to-r , cyan.400, blue.500)"}
         bgClip={"text"}
         >
          Current Products
        </Text>

        <SimpleGrid columns={{
          base:1 , md:2 , lg : 3
        }} 
        spacing={10}
        w={"full"}>
        {products.map((product)=>(
         <ProductCard key={product._id} product={product} onDelete={handleDeleteProduct} onUpdate={handleUpdateProduct} />
        ))}
        </SimpleGrid>
        
       {products.length ===0 && (
        <Text fontSize={'xl'} 
        textAlign={"center"} 
         color={"gray.500"}
         fontWeight={"bold"}
        
        >
          No Product found ! 
             
          <Link to={"/createpage"}>
          <Text as={'span'} color={'blue.500'} _hover={{textDecoration:"underline"}} ml={3}>
            Create a Product 
          </Text>
          </Link>
        </Text>
       ) }

      </VStack>
    </Container>
  )
}

export default Homepage