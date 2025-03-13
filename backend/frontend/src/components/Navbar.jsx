import React from 'react'
import { Container, Flex, HStack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import { AddIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react";
import { GoSun } from "react-icons/go";
import { MdNightlight } from "react-icons/md";


const navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
   const bgcolor =useColorModeValue('red' , "green.600")
  return (
    <div >
      <Container maxW={"1140"} px={4} >
        <Flex h={16} justifyContent={"space-between"}
          alignItems={"center"}>
          <Text fontSize={{ base: '22', sm: '28' }}
            fontWeight={"bold"}
            textTransform={'uppercase'}
            textAlign={'center'}
            bgGradient={"linear(to-r , cyan.400, blue.500)"}
            bgClip={"text"}>
            <Link to={'/'} > TastyBite  </Link>
          </Text>
          <HStack spacing={2} alignItems={"center"}>
            <Link to={'/createpage'}>
              <Button> <AddIcon fontSize={10} /> </Button></Link>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MdNightlight /> : <GoSun />}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </div>
  )
}

export default navbar