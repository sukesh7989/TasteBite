
import {Box  } from "@chakra-ui/react";
import {Routes , Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "../src/pages/Homepage"
import Createpage from "./pages/Createpage"

function App() {

  
   return (
    <>
     <Box minH={"100vh"}    >
       <Navbar/>
      <Routes>
        <Route  path="/" element={<Homepage/>} />
        <Route  path="/createpage" element={<Createpage/>} />


      </Routes>
     </Box>
    </>
  )
}

export default App
