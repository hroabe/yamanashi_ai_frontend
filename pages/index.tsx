import { CopyIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, FormControl, FormLabel, HStack, IconButton, 
         Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField,
         NumberInputStepper, Spacer, Spinner, Text, Textarea, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import Link from 'next/link'
import { useState } from 'react'

const Index = () => {
  const toDay = new Date()

  const [title, setTitle] = useState<string>('タイトル')
  const [subTitle, setSubTitle] = useState<string>('')
  const [abstract, setAbstract] = useState<string>('')
  const [hashTag, setHashTag] = useState<string>('#test #test')

  const [keyword1, setKeyword1] = useState<string>('')
  const [keyword2, setKeyword2] = useState<string>('')
  const [keyword3, setKeyword3] = useState<string>('')

  const [numberOfParticipant, setNumberOfParticipant] = useState<number>(1)
  const [day, setDay] = useState<Date>(toDay)
  const [loadingAI, setLoadingAI] = useState<boolean>(false)
  const [imgUrl, setImgUrl] = useState<string|undefined>(undefined)

  const toast = useToast()

  // 生成APIを使った勉強会の生成
  const OnSubmit = () => {
 
    let keywords = ''
    if (keyword1 != '') keywords += keyword1
    if (keyword2 != '') keywords += ((keywords != '')? ',' : '') + keyword2
    if (keyword3 != '') keywords += ((keywords != '')? ',' : '') + keyword3

    console.log(keywords)

    if (keywords == ''){
      toast({
        title: 'Warning',
        description: 'キーワードが入力されていません',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })       
      return
    }
    
    toast({
      title: 'Run',
      description: '実行開始しました',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })       

    setLoadingAI(true)

    axios.get(`http://localhost:8000/${keywords}`, {timeout: 1200000})  /* 120秒 */
      .then(
        (ret) => {
          // 取得完了
          if (ret?.status == 200){
            console.log(ret)
            setTitle(ret?.data?.title)
            setImgUrl(ret?.data?.image_url)
            setHashTag(ret?.data?.hashtag)

            let outline = ret?.data?.general_info + '\r\n'
            outline += '\r\n'
            ret?.data?.outline.map((v: string)=>{
              outline += v + '\r\n'
            })
            outline += '\r\n'
            ret?.data?.outline.map((v: string)=>{
              outline += v + '\r\n'
            })
            setAbstract(outline)
          }
        }
      )
      .catch(
        (e) => {
          toast({
            title: 'Error',
            description: `エラーが発生しました ${e}`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })           
        })
      .finally(
        () => {
          setLoadingAI(false)
        }
      )
   }

  // Connpass へのデプロイ 
  const OnDeploy = () => {

    const data = {
      title: title,
      sub_title: subTitle,
      startdate: `${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`,
      member: numberOfParticipant,
      imgpath: imgUrl,
      description: abstract  
    }

    axios.post(`http://localhost:8001/connpass`, data)
      .then(
        (ret) => {
          // 取得完了
          if (ret?.status == 200){
            // 成功
          }
        }
      )
      .catch(
        (e) => {
          toast({
            title: 'Error',
            description: `エラーが発生しました ${e}`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })           
        })
      .finally(
        () => {
        }
      )
  }

  const onClickCopy = async () => {
    await global.navigator.clipboard.writeText(abstract)
    toast({
      title: 'Copy',
      description: 'コピーしました',
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
  }

  return (
    <Box h={'100%'} w={'100%'} bg='white' >
      <HStack w={'100%'} h={'60px'} bg='black' p={5} verticalAlign={'center'} alignContent={'center'}>

        <HStack>
          <Box verticalAlign={'center'} fontSize={32} fontWeight={'bold'} ml={5} color='white'>
            山本勘助晴幸
          </Box>            
          <Box ml={5} fontSize={24} color={'white'}>- Study Session Generation AI -</Box>
        </HStack>
        <Spacer/>
        <HStack justifyItems={'right'}>
          <Box fontSize={24} color={'white'}>Brought to you by</Box>
          <Box fontSize={32} color={'white'} fontWeight={'bold'}  ml={3}>
            <Link href='https://shingenpy.connpass.com/'>Shingen.py</Link>
          </Box>
          <Link href='https://github.com/hroabe/yamanashi_ai_frontend' >
            <Image w={'30'} h={'30'} src='./github-mark-white.png' alt='logo' ml={10}/>
          </Link>   
          <Link href='https://github.com/k0syam/yamanashiai2023codes' >
            <Image w={'30'} h={'30'} src='./github-mark-white.png' alt='logo' />
          </Link>
        </HStack>
      </HStack>

      <HStack p={5} alignItems={'top'} >
        <VStack  w={'500px'} >

          {/* 生成部 */}
          <VStack justifyContent={'top'} p={7}  w={'100%'} alignItems={'left'} 
            rounded={'md'} boxShadow={'md'} borderColor={'gray.400'} borderWidth={'1px'}>

            <FormControl>
              <Box fontWeight={'bold'} fontSize={20} textDecoration={'underline'}>Step1: AIによる勉強会生成</Box>
              <FormLabel mt={5}>候補のフレームワーク, 技術 (最大3つ)</FormLabel>
              
              <Box bg="white">              
                <Input borderColor={'gray.400'} value={keyword1} onChange={(e) => {                
                  setKeyword1(e.target.value)
                }} isDisabled={loadingAI} />

                <Input borderColor={'gray.400'} value={keyword2} onChange={(e) => {                
                  setKeyword2(e.target.value)
                }} mt={2} isDisabled={loadingAI} />

                <Input borderColor={'gray.400'} value={keyword3} onChange={(e) => {                
                  setKeyword3(e.target.value)
                }} mt={2} isDisabled={loadingAI} bg="white"/>
              </Box>              

              <Button mt={5} bg={'black'} color={'white'} w={'100%'} onClick={OnDeploy}
                isDisabled={loadingAI}>実行</Button>

              {(loadingAI)? (<Box verticalAlign={'center'}><Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='red.500'
                size='lg'
                mt={5}
              /><Text>生成中...</Text></Box>): <></>}
            </FormControl>       

          </VStack>

          {/* 勉強会自動作成 */}
          <VStack justifyContent={'top'} p={7}  w={'100%'} mt={5} alignItems={'left'}
            rounded={'md'} boxShadow={'md'} borderColor={'gray.400'} borderWidth={'1px'}>
            
            <Text fontWeight={'bold'} fontSize={20} textDecoration={'underline'}>Step2: 勉強会の自動作成</Text>

            <FormLabel mt={5}>サブタイトル</FormLabel>
              <Input borderColor={'gray.400'} value={subTitle} onChange={(e) => {setSubTitle(e.target.value)}} placeholder='もしあれば'/>

              <FormLabel mt={2}>開催日</FormLabel>
              <Box borderColor={'gray.400'}>
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
                borderColor={'gray.400'}
                onChange={(e) => {setNumberOfParticipant(parseInt(e))}}
              >
                <NumberInputField />
                <NumberInputStepper borderColor={'gray.400'}>
                  <NumberIncrementStepper borderColor={'gray.400'}/>
                  <NumberDecrementStepper borderColor={'gray.400'}/>
                </NumberInputStepper>
              </NumberInput>

              <Button mt={8} bg={'black'} color={'white'} w={'100%'} onSubmit={OnSubmit}>作成</Button>
          </VStack>          
        </VStack>            

        {/* 生成結果 */}
        <VStack justifyContent={'top'} p={5} alignItems={'start'} w={'100%'} ml={5}
            rounded={'md'} boxShadow={'md'} borderColor={'gray.400'} borderWidth={'1px'}>            
            
            <HStack fontSize={30} fontWeight={'bold'}>
              <Text>{title}</Text>
            </HStack>
      
            <Flex borderColor={'gray.300'} borderWidth={'1px'} width={'100%'} justifyContent={'center'} rounded={'md'} height={'500px'}  scrollBehavior={'initial'}>
              <Image src={(typeof imgUrl !== 'undefined') ? imgUrl : './blank.png'} alt='result_image' rounded={'md'} objectFit={'cover'} width={(typeof imgUrl === 'undefined')?"inherit": "fit-content"}/>
            </Flex>
                        
            <HStack fontSize={20}>
              <Text textColor={'blue.400'}>{hashTag}</Text>
            </HStack>

            <HStack alignItems={'center'}>
              <Text>アウトライン</Text>
              <IconButton aria-label='copy' icon={<CopyIcon />} w={10} h={10} onClick={()=> onClickCopy()}/>
            </HStack>
            <Textarea w={'100%'} h={'200px'} borderColor={'gray.300'} value={abstract} onChange={(e) => {setAbstract(e.target.value)}}
                      bg='gray.50'/>                       

        </VStack>

      </HStack>
    </Box>
  )
}

export default Index
