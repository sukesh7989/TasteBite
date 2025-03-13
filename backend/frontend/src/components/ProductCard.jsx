import { 
  Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, 
  ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, VStack 
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from 'axios';
import { toast } from "react-toastify";

const ProductCard = ({ product, onDelete, onUpdate }) => {
  const textcolor = useColorModeValue("gray.600", "gray.200");
  const bgcolor = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Rename updataProduct → updatedProduct for consistency
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isUpdating, setIsUpdating] = useState(false);

  // Corrected handleChange function
  const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedProduct((prev) => ({
          ...prev,
          [name]: value
      }));
  };

  const handleDelete = async () => {
      try {
          await axios.delete(`http://localhost:5000/api/products/${product._id}`);
          onDelete(product._id); // Notify parent to update UI
      } catch (err) {
          console.log("Error deleting product:", err);
      }
  };

  const handleUpdate = async () => {
      setIsUpdating(true);
      try {
          const res = await axios.put(`http://localhost:5000/api/products/${product._id}`, updatedProduct);
          onUpdate(res.data.data); // Update the UI
          toast.success("Product updated successfully!");
          onClose();
      } catch (err) {
          console.log("Error updating product:", err);
          toast.error("Failed to update product.");
      }
      setIsUpdating(false);
  };

  return (
      <Box 
          color={bgcolor}
          shadow={'lg'}
          rounded={'lg'}
          overflow={'hidden'}
          transition={'all 0.3s'}
          _hover={{ transform: 'translateY(-5px)', shadow: "xl" }}
      >
          <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />

          <Box p={4}>
              <Text fontWeight={'bold'} fontSize={'xl'} mt={2}  mb={2} color={textcolor}>
                  {product.name}
              </Text>
              <Text fontWeight={'bold'} fontSize={'xl'} mb={4} color={textcolor}>
                  ${product.price}
              </Text>

              <HStack spacing={2}>
                  <IconButton icon={<EditIcon />} colorScheme='blue' onClick={onOpen} />
                  <IconButton icon={<DeleteIcon />} colorScheme='red' onClick={handleDelete} />
              </HStack>

              {/* Update Product Modal */}
              <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                      <ModalHeader>Update Product</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                          <VStack spacing={4}>
                              <Input placeholder='Product Name' name='name' value={updatedProduct.name} onChange={handleChange} />
                              <Input placeholder='Price' name='price' type='number' value={updatedProduct.price} onChange={handleChange} />
                              <Input placeholder='Image URL' name='image' value={updatedProduct.image} onChange={handleChange} />
                          </VStack>
                      </ModalBody>

                      <ModalFooter>
                          <Button colorScheme='blue' mr={3} onClick={handleUpdate} isLoading={isUpdating}>
                              Update
                          </Button>
                          <Button variant='ghost' onClick={onClose}>Cancel</Button>
                      </ModalFooter>
                  </ModalContent>
              </Modal>
          </Box>
      </Box>
  );
};

export default ProductCard;
