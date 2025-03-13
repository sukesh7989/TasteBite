import { Box, Button, Container, Heading, Input, useColorModeValue, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const CreatePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '', // Store URL as a string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/products", formData);

      toast.success("Product added successfully!");
      console.log(response.data);
    } catch (err) {
      toast.error("Failed to add product");
      console.error(err);
    }
    setFormData({name:"" , price:"" , image:''})
  };

  return (
    <div>
      <ToastContainer />
      <Container maxW={"container.sm"}>
        <VStack spacing={8}>
          <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
            Create new product
          </Heading>
          <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"xl"}>
            <form onSubmit={handleAddProduct}>
              <VStack spacing={4}>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Price"
                  name="price"
                  type="text"
                  value={formData.price}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
                <Button type="submit" colorScheme="blue" w="full">
                  Add Product
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Container>
    </div>
  );
};

export default CreatePage;
