import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { TemplateScreen } from '../../components/TemplateScreen/TemplateScreen';

export default function Hit() {
  return (
    <TemplateScreen>
      <Box
        boxShadow='xs'
        border='1px solid'
        borderColor='cyanX.100'
        p='6'
        rounded='md'
        textColor='whiteX.100'
      >
        <Flex gap='1rem'>
          <InputGroup>
            <InputLeftAddon background='transparent' padding='.5rem'>
              <SearchIcon />
            </InputLeftAddon>
            <Input
              type='text'
              placeholder='Buscar pelo site'
              _focus={{ boxShadow: 'none', borderColor: 'cyanX.100' }}
            />
          </InputGroup>
          <Button
            background='transparent'
            padding='0'
            _hover={{ background: 'cyanX.100' }}
            _focus={{ background: 'cyanX.100' }}
          >
            <AddIcon textColor='whiteX.100' />
          </Button>
        </Flex>
      </Box>
    </TemplateScreen>
  );
}
