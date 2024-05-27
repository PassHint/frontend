import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, QuestionIcon, SearchIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import { TemplateScreen } from '../../components/TemplateScreen/TemplateScreen';
import { hitFormSchema } from '../../validation';
import { ValidationError } from 'yup';

export default function Hit() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [fiveIconWebsite, setFiveIconWebsite] = useState<string | null>(null);
  const formWebSiteRef = useRef<HTMLInputElement>(null);
  const formHitRef = useRef<HTMLTextAreaElement>(null);

  const urlFiveIcon = `https://www.google.com/s2/favicons?domain=`;

  async function handleIconWebsite() {
    const websiteValue = formWebSiteRef.current?.value;
    return setFiveIconWebsite(`${urlFiveIcon}${websiteValue}`);
  }

  async function createHit() {
    const websiteValue = formWebSiteRef.current?.value;
    const hitValue = formHitRef.current?.value;

    try {
      await hitFormSchema.validate({
        website: websiteValue,
        hit: hitValue,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return toast({
          title: 'O formulário está incorreto!',
          description: error.message,
          status: 'warning',
          duration: 2000,
          position: 'top',
          isClosable: true,
        });
      }
      return toast({
        title: 'Error!',
        description: 'Tipo de error não mapeado!',
        status: 'warning',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
    }
  }

  return (
    <TemplateScreen>
      <Box
        boxShadow='xs'
        border='1px solid'
        borderColor='cyanX.100'
        p='6'
        width='45rem'
        rounded='md'
        textColor='whiteX.100'
      >
        <Flex gap='1rem' marginBottom='3rem'>
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
            onClick={onOpen}
          >
            <AddIcon textColor='whiteX.100' />
          </Button>
        </Flex>
        <Accordion
          allowToggle
          display='flex'
          flexDirection='column'
          gap='1rem'
        >
          <AccordionItem
            border='1px solid'
            borderColor='blackX.200'
            borderRadius='5px'
          >
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                Section 1 title
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel marginLeft='1rem' textAlign='justify'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Modal
          initialFocusRef={formWebSiteRef}
          finalFocusRef={formHitRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent
            width='20rem'
            background='blackX.100'
            textColor='whiteX.100'
          >
            <ModalHeader>Crie a dica:</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Site da senha:</FormLabel>
                <InputGroup>
                  <InputLeftAddon background='transparent' padding='.5rem'>
                    {fiveIconWebsite ? (
                      <Image src={fiveIconWebsite} />
                    ) : (
                      <QuestionIcon />
                    )}
                  </InputLeftAddon>
                  <Input
                    type='text'
                    ref={formWebSiteRef}
                    placeholder='https://google.com'
                    onBlur={handleIconWebsite}
                    _focus={{ boxShadow: 'none', borderColor: 'cyanX.100' }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Dica da senha:</FormLabel>
                <Textarea
                  ref={formHitRef}
                  height='8rem'
                  placeholder='Dica da senha'
                  _focus={{ boxShadow: 'none', borderColor: 'cyanX.100' }}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={createHit}
                mr={3}
                background='cyanX.200'
                textColor='whiteX.100'
                fontWeight='normal'
                letterSpacing='.9px'
                _hover={{ background: 'cyanX.100' }}
              >
                Salvar
              </Button>
              <Button
                onClick={onClose}
                background='blackX.200'
                textColor='whiteX.100'
                fontWeight='normal'
                letterSpacing='.9px'
                _hover={{ background: 'cyanX.100' }}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </TemplateScreen>
  );
}
