import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {useJsApiLoader, GoogleMap, Marker, Autocomplete} from "@react-google-maps/api"
import { useState } from 'react'

const center = { lat: 48.8584, lng: 2.2924 }

function App() {

  const [map, setMap] = useState( /** @type google.map.Map */ (null)); 

  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, 
    libraries: ['places'], 
  })

  if(!isLoaded) { 
    return <SkeletonText />
  }


  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center' 
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>

        <GoogleMap center={center} 
          zoom={15} 
          mapContainerStyle={{ width:'100%', height:'100%' }}
          options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={map => setMap(map)}
        >
        <Marker position={center} />
        
        </GoogleMap>

      </Box>

      <Box
        p={4}
        borderRadius='lg'
        mt={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='modal'
      >
        <HStack spacing={4}>

        <Autocomplete>
          <Input type='text' placeholder='Origin' />
        </Autocomplete>


          <Autocomplete>
            <Input type='text' placeholder='Destination' />
          </Autocomplete>

          <ButtonGroup>
            <Button colorScheme='pink' type='submit'>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={() => alert(123)}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: </Text>
          <Text>Duration: </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => map.panTo(center)}
          />
        </HStack>
      </Box>
    </Flex>
  )
}

export default App
