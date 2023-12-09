import { Box, Button, Divider, Flex, FormControl, FormLabel, Grid, GridItem, HStack, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spacer, Stack, Textarea, VStack } from "@chakra-ui/react"
import { SingleDatepicker } from "chakra-dayzed-datepicker"
import Link from "next/link"
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
      <HStack w={"100%"} h={"60px"} bg="black" p={5} verticalAlign={"center"} alignContent={"center"}>

        <HStack>
          <Box verticalAlign={"center"} fontSize={32} fontWeight={"bold"} ml={5} color="white">Shingen.py</Box>
          <Box ml={5} fontSize={24} color={"white"}>- Study Session Generation AI -</Box>
        </HStack>
        <Spacer/>
        <Stack justifyItems={"right"}>
          <Link href="https://github.com/hroabe/yamanashi_ai_frontend" >
            <Image w={"30"} h={"30"} src="/github-mark-white.png" alt="logo"/>
          </Link>          
        </Stack>
      </HStack>

      <HStack p={8} alignItems={"top"} mt={3}>
        <Box w={"fit-content"}>
          <VStack justifyContent={"top"} p={7}  w={"100%"} 
            rounded={"md"} boxShadow={"md"} borderColor={"gray.400"} borderWidth={"1px"}>

            <FormControl>
              <Box fontWeight={"bold"} fontSize={20}>設定</Box>

              <Divider borderColor={"gray.500"} mt={3} />

              <FormLabel mt={5}>タイトル</FormLabel>
              <Input w={"500px"} borderColor={"gray.400"} value={title} placeholder="勉強会タイトル" onChange={(e) => {setTitle(e.target.value)}}/>

              <FormLabel mt={2}>概要 (MarkDown)</FormLabel>
              <Textarea w={"500px"} h={"200px"} borderColor={"gray.400"} value={abstract} onChange={(e) => {setAbstract(e.target.value)}}/>

              <FormLabel mt={2}>サブタイトル</FormLabel>
              <Input w={"500px"} borderColor={"gray.400"} value={subTitle} onChange={(e) => {setSubTitle(e.target.value)}}/>

              <FormLabel mt={2}>ハッシュタグ</FormLabel>
              <Input w={"500px"} borderColor={"gray.400"} value={hashTag} onChange={(e) => {setHashTag(e.target.value)}}/>

              <FormLabel mt={2}>開催日</FormLabel>
              <Box borderColor={"gray.400"}>
                <SingleDatepicker onDateChange={(e)=>{setDay(e)}} date={day}/>
              </Box>
              
              <FormLabel mt={2}>参加人数</FormLabel>

              <NumberInput
                defaultValue={5}
                min={1}
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

              <Button mt={10} bg={"black"} color={"white"} w={"150px"} onSubmit={OnSubmit}>実行</Button>            

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
