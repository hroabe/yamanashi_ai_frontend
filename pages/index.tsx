import { CopyIcon } from "@chakra-ui/icons"
import { AspectRatio, Box, Button, Divider, Flex, FormControl, FormLabel, Grid, GridItem, HStack, IconButton, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spacer, Stack, Text, Textarea, VStack } from "@chakra-ui/react"
import { SingleDatepicker } from "chakra-dayzed-datepicker"
import Link from "next/link"
import { useState } from "react"

const Index = () => {
  const toDay = new Date()

  const [title, setTitle] = useState<string>("ここにタイトルがはいります")
  const [subTitle, setSubTitle] = useState<string>("")
  const [abstract, setAbstract] = useState<string>("")
  const [hashTag, setHashTag] = useState<string>("#test #test")
  const [keyword, setKeyword] = useState<string>("")
  const [numberOfParticipant, setNumberOfParticipant] = useState<number>(1)
  const [day, setDay] = useState<Date>(toDay)

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
            <Image w={"30"} h={"30"} src="./github-mark-white.png" alt="logo"/>
          </Link>          
        </Stack>
      </HStack>

      <HStack p={8} alignItems={"top"} mt={3}>
        <VStack>

          {/* 生成部 */}
          <VStack justifyContent={"top"} p={7}  w={"100%"} alignItems={"left"}
            rounded={"md"} boxShadow={"md"} borderColor={"gray.400"} borderWidth={"1px"}>

            <FormControl>
              <Box fontWeight={"bold"} fontSize={20} textDecoration={"underline"}>Step1: AIによる勉強会生成</Box>
              <FormLabel mt={5}>テーマ</FormLabel>
              <Textarea w={"400px"} h={"150px"} borderColor={"gray.400"} alignContent={"top"} mt={2}
              value={keyword} placeholder="技術のキーワードを入力してくだい" onChange={(e) => {setKeyword(e.target.value)}}/>

              <Button mt={5} bg={"black"} color={"white"} w={"200px"} onSubmit={OnSubmit}>実行</Button>
            </FormControl>       

          </VStack>

          {/* 生成結果 (概要部) */}
          <VStack justifyContent={"top"} p={7}  w={"100%"} mt={5} alignItems={"left"}
            rounded={"md"} boxShadow={"md"} borderColor={"gray.400"} borderWidth={"1px"}>
            
            <Text fontWeight={"bold"} fontSize={20} textDecoration={"underline"}>Step2: 勉強会の自動作成</Text>

            <FormLabel mt={5}>サブタイトル</FormLabel>
              <Input borderColor={"gray.400"} value={subTitle} onChange={(e) => {setSubTitle(e.target.value)}} placeholder="もしあれば"/>

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
                borderColor={"gray.400"}
                onChange={(e) => {setNumberOfParticipant(parseInt(e))}}
              >
                <NumberInputField />
                <NumberInputStepper borderColor={"gray.400"}>
                  <NumberIncrementStepper borderColor={"gray.400"}/>
                  <NumberDecrementStepper borderColor={"gray.400"}/>
                </NumberInputStepper>
              </NumberInput>

              <Button mt={5} bg={"black"} color={"white"} w={"200px"} onSubmit={OnSubmit}>作成</Button>
          </VStack>          
        </VStack>            


        <VStack justifyContent={"top"} p={5} alignItems={"start"} w={"100%"} ml={5}
            rounded={"md"} boxShadow={"md"} borderColor={"gray.400"} borderWidth={"1px"}>            
            
            <HStack fontSize={40} fontWeight={"bold"}>
              <Text>{title}</Text>
            </HStack>

            <Text>画像</Text>            
            <Flex borderColor={"gray.300"} borderWidth={"1px"} width={"100%"}>
              <Image src="./blank.png" alt="result_image" width={"100%"} height={"400px"} rounded={"md"} />
            </Flex>
                        
            <HStack fontSize={20}>
              <Text textColor={"blue.400"}>{hashTag}</Text>
            </HStack>

            <HStack alignItems={"center"}>
              <Text>概要 (Markdown)</Text>
              <IconButton aria-label="copy" icon={<CopyIcon />} w={10} h={10} onClick={(e)=>{
                
              }}/>
            </HStack>
            <Textarea w={"100%"} h={"300px"} borderColor={"gray.300"} value={abstract} onChange={(e) => {setAbstract(e.target.value)}}
                      bg="gray.50"/>                       

        </VStack>

      </HStack>
    </Box>
  )
}

export default Index

              {/*
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
            */}