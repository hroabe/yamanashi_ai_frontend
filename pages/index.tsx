import { Box, Button, Divider, Flex, FormControl, FormLabel, Grid, GridItem, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Textarea, VStack } from "@chakra-ui/react"
import { SingleDatepicker } from "chakra-dayzed-datepicker"
import { useState } from "react"

const Index = () => {
  const toDay = new Date()
  const [title, setTitle] = useState<string>("")
  const [abstract, setAbstract] = useState<string>("")
  const [subTitle, setSubTitle] = useState<string>("")
  const [hashTag, setHashTag] = useState<string>("")
  const [day, setDay] = useState<Date>(toDay)
  const [location, setLocation] = useState<string>("")
  const [numberOfParticipant, setNumberOfParticipant] = useState<number>(1)

  const OnSubmit = () => {

  }

  return (
    <Box h={"100%"} w={"100%"} bg="white" >
      <Flex h={"80px"} bg="blue.200" p={3}>
        <Box verticalAlign={"center"} fontSize={32} fontWeight={"bold"} ml={5}>Shingen.py</Box>
      </Flex>

      <HStack p={5} alignItems={"top"}>
        <Box w={"fit-content"}>
          <VStack justifyContent={"top"} p={10}  w={"100%"} 
            rounded={"md"} boxShadow={"md"} borderColor={"gray.400"} borderWidth={"1px"}>

            <FormControl>
              <FormLabel fontWeight={"bold"}>タイトル</FormLabel>
              <Input w={"500px"} borderColor={"gray.400"} value={title} placeholder="勉強会タイトル" onChange={(e) => {setTitle(e.target.value)}}/>

              <FormLabel mt={2} fontWeight={"bold"}>概要 (MarkDown)</FormLabel>
              <Textarea w={"500px"} h={"200px"} borderColor={"gray.400"} value={abstract} onChange={(e) => {setAbstract(e.target.value)}}/>

              <FormLabel mt={2} fontWeight={"bold"}>サブタイトル</FormLabel>
              <Input w={"500px"} borderColor={"gray.400"} value={subTitle} onChange={(e) => {setSubTitle(e.target.value)}}/>

              <FormLabel mt={2} fontWeight={"bold"}>ハッシュタグ</FormLabel>
              <Input w={"500px"} borderColor={"gray.400"} value={hashTag} onChange={(e) => {setHashTag(e.target.value)}}/>

              <FormLabel mt={2} fontWeight={"bold"}>開催日</FormLabel>
              <Box borderColor={"gray.400"}>
                <SingleDatepicker onDateChange={(e)=>{setDay(e)}} date={day}/>
              </Box>
              
              <FormLabel mt={2} fontWeight={"bold"}>参加人数</FormLabel>

              <NumberInput
                defaultValue={5}
                max={1000}
                value={numberOfParticipant} 
                keepWithinRange={false}
                clampValueOnBlur={false}
                w={"500px"} borderColor={"gray.400"}
                onChange={(e) => {setNumberOfParticipant(parseInt(e))}}
              >
                <NumberInputField />
                <NumberInputStepper borderColor={"gray.400"}>
                  <NumberIncrementStepper borderColor={"gray.400"}/>
                  <NumberDecrementStepper borderColor={"gray.400"}/>
                </NumberInputStepper>
              </NumberInput>            

              <FormLabel mt={2} fontWeight={"bold"}>開催地</FormLabel>
              <Input w={"500px"} borderColor={"gray.400"} value={location} onChange={(e) => {setLocation(e.target.value)}}
                placeholder="XX県〇〇市"/>

              <Divider borderColor={"gray.400"} mt={10} />

              <Button mt={5} bg={"blue.300"} w={"150px"} onSubmit={OnSubmit}>実行</Button>            

            </FormControl> 

          </VStack>
        </Box>

        <VStack justifyContent={"center"} p={10} alignContent={"center"} w={"100%"} ml={5}
            rounded={"md"} boxShadow={"md"} borderColor={"gray.400"} borderWidth={"1px"}>            
            <Box p={3}>
              <Flex fontWeight={"bold"} fontSize={30}>実行結果</Flex>
            </Box>
        </VStack>

      </HStack>
  

    </Box>
  )
}

export default Index
