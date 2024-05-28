import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ValidationError } from 'yup';
import { AddIcon, DeleteIcon, QuestionIcon, SearchIcon } from '@chakra-ui/icons';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { TemplateScreen } from '../../components/TemplateScreen/TemplateScreen';
import { hintFormSchema } from '../../validation';
import { routes } from '../../routes';
import { InterfaceHint, InterfaceUser } from '../../interfaces';
import HintModal from '../../components/HintModal';

export default function Hint() {
  const [hints, setHints] = useState<InterfaceHint[]>([]);
  const [hintFocus, setHintFocus] = useState<InterfaceHint>();
  const [filterHints, setFilterHints] = useState<InterfaceHint[]>();
  const { isOpen: isOpenModalHint, onOpen: onOpenModalHint, onClose: onCloseModalHint } = useDisclosure();
  const { isOpen: isOpenDeleteModalHint, onOpen: onOpenDeleteModalHint, onClose: onCloseDeleteModalHint } = useDisclosure();
  const toast = useToast();
  const [fiveIconWebsite, setFiveIconWebsite] = useState<string | null>(null);
  const formWebSiteRef = useRef<HTMLInputElement>(null);
  const formHintRef = useRef<HTMLTextAreaElement>(null);

  const urlFiveIcon = `https://www.google.com/s2/favicons?domain=`;

  const scroll = {
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#BABABA',
      borderRadius: '24px',
      scrollY: 10,
    },
  };

  async function listHint() {
    const storageUser: InterfaceUser = JSON.parse(
      localStorage.getItem('user') || ''
    );
    try {
      const { data: response, status } = await routes.list_hints({
        token: storageUser.token,
      });
      if (status !== 200) {
        return toast({
          title: 'Error!',
          description: response.error.message,
          status: 'warning',
          duration: 2000,
          position: 'top',
          isClosable: true,
        });
      }
      setHints(response.data);
    } catch (error) {
      return toast({
        title: 'Error!',
        description: 'Não foi possível listar as dicas!',
        status: 'warning',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    (async () => {
      await listHint();
    })();
  }, [toast]);

  async function handleIconWebsite() {
    const websiteValue = formWebSiteRef.current?.value;
    return setFiveIconWebsite(`${urlFiveIcon}${websiteValue}`);
  }

  async function validateHint() {
    const storageUser: InterfaceUser = JSON.parse(
      localStorage.getItem('user') || ''
    );

    const websiteValue = formWebSiteRef.current?.value || '';
    const hintValue = formHintRef.current?.value || '';
    try {
      await hintFormSchema.validate({
        website: websiteValue,
        hint: hintValue,
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

    await createHint({
      website: websiteValue,
      hint: hintValue,
      token: storageUser.token,
    });
  }

  async function createHint({
    website,
    hint,
    token,
  }: {
    website: string;
    hint: string;
    token: string;
  }) {
    try {
      const { data: response, status } = await routes.create_hint({
        source: website,
        content: hint,
        token,
      });
      if (status !== 200) {
        return toast({
          title: 'Error!',
          description: response.error.message,
          status: 'warning',
          duration: 2000,
          position: 'top',
          isClosable: true,
        });
      }
      setHints([...(hints || []), response.data]);
      onCloseModalHint()
      return toast({
        title: 'Sucesso!',
        description: 'Dica criada com sucesso!',
        status: 'success',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
    } catch (error) {
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

  async function deleteHint()  {
    const storageUser: InterfaceUser = JSON.parse(
      localStorage.getItem('user') || ''
    );

    try {
      const { data: response, status } = await routes.delete_hint({
        id: hintFocus!.id,
        token: storageUser.token
      });
      if (status === 404) {
        onCloseDeleteModalHint()
        return toast({
          title: 'Error!',
          description: 'não foi possível deletar a dica!',
          status: 'warning',
          duration: 2000,
          position: 'top',
          isClosable: true,
        });
      }
      if (status !== 204) {
        onCloseDeleteModalHint()
        return toast({
          title: 'Error!',
          description: response.error.message,
          status: 'warning',
          duration: 2000,
          position: 'top',
          isClosable: true,
        });
      }
      onCloseDeleteModalHint()
      await listHint()
      return toast({
        title: 'Sucesso!',
        description: 'Dica deletada com sucesso!',
        status: 'success',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
    } catch (error) {
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

  async function openHintModel(hint?: InterfaceHint) {
    if(hint) {
      setHintFocus(hint)
      onOpenModalHint()
    } else {
      setHintFocus(undefined)
      setFiveIconWebsite(null)
      onOpenModalHint()
    }
  }

  async function searchHint(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const regex = new RegExp(value, 'gi');
    const filter = hints?.filter((hint) => regex.test(hint.source));
    setFilterHints(filter);
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
              onChange={(event) => searchHint(event)}
              placeholder='Buscar pelo site'
              _focus={{ boxShadow: 'none', borderColor: 'cyanX.100' }}
            />
          </InputGroup>
          <Button
            background='transparent'
            padding='0'
            _hover={{ background: 'cyanX.100' }}
            _focus={{ background: 'cyanX.100' }}
            onClick={() => openHintModel()}
          >
            <AddIcon textColor='whiteX.100' />
          </Button>
        </Flex>
        <Box
          overflowY='scroll'
          height='25rem'
          css={scroll}
          paddingRight='.5rem'
        >
          <Accordion
            allowToggle
            display='flex'
            flexDirection='column'
            gap='1rem'
          >
            {filterHints?.length
              ? filterHints.map((hint) => (
                  <AccordionItem
                    key={hint.id}
                    border='1px solid'
                    borderColor='blackX.200'
                    borderRadius='5px'
                  >
                    <AccordionButton display='flex' gap='.5rem'>
                      <Image src={`${urlFiveIcon}${hint.source}`} />
                      <Box as='span' flex='1' textAlign='left'>
                        {hint.source}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel marginLeft='1rem' textAlign='justify'>
                      {hint.content}
                    </AccordionPanel>
                  </AccordionItem>
                ))
              : hints &&
                hints.map((hint) => (
                  <AccordionItem
                    key={hint.id}
                    border='1px solid'
                    borderColor='blackX.200'
                    borderRadius='5px'
                  >
                    <AccordionButton display='flex' gap='.5rem'>
                      <Image src={`${urlFiveIcon}${hint.source}`} />
                      <Box as='span' flex='1' textAlign='left'>
                        {hint.source}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel marginLeft='1rem' textAlign='justify'>
                      <Flex flexDirection="row" justifyItems='top' gap="1rem" justifyContent='space-between'>
                        <Text>
                          {hint.content}
                        </Text>
                        <Flex flexDirection='column' gap=".5rem">
                          <Button
                            background='transparent'
                            padding='0'
                            _hover={{ background: 'cyanX.100' }}
                            _focus={{ background: 'cyanX.100' }}
                            onClick={() => {setHintFocus(hint); onOpenDeleteModalHint()}}
                          >
                            <DeleteIcon textColor='whiteX.100'/>
                          </Button>
                          <Button
                            background='transparent'
                            padding='0'
                            _hover={{ background: 'cyanX.100' }}
                            _focus={{ background: 'cyanX.100' }}
                            onClick={() => openHintModel(hint)}
                          >
                            <QuestionIcon textColor='whiteX.100'/>
                          </Button>
                        </Flex>
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
          </Accordion>
        </Box>

        {
          isOpenModalHint && <HintModal
            hint={hintFocus}
            fiveIconWebsite={fiveIconWebsite}
            formHintRef={formHintRef}
            formWebSiteRef={formWebSiteRef}
            isOpenModalHint={isOpenModalHint}
            onCloseModalHint={onCloseModalHint}
            handleIconWebsite={handleIconWebsite}
            validateHint={validateHint}
          />
        }

        {/* <Modal
          initialFocusRef={formWebSiteRef}
          finalFocusRef={formHintRef}
          isOpen={isOpenModalHint}
          onClose={onCloseModalHint}
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
                    placeholder='google.com'
                    onBlur={handleIconWebsite}
                    _focus={{ boxShadow: 'none', borderColor: 'cyanX.100' }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Dica da senha:</FormLabel>
                <Textarea
                  ref={formHintRef}
                  height='8rem'
                  placeholder='Dica da senha'
                  _focus={{ boxShadow: 'none', borderColor: 'cyanX.100' }}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={validateHint}
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
                onClick={onCloseModalHint}
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
        </Modal> */}

        <Modal
          isOpen={isOpenDeleteModalHint}
          onClose={onCloseDeleteModalHint}
        >
          <ModalOverlay />
          <ModalContent
            width='20rem'
            background='blackX.100'
            textColor='whiteX.100'
          >
            <ModalHeader>Deletar dica?</ModalHeader>
            <ModalCloseButton />
            <ModalFooter>
              <Button
                onClick={deleteHint}
                mr={3}
                background='cyanX.200'
                textColor='whiteX.100'
                fontWeight='normal'
                letterSpacing='.9px'
                _hover={{ background: 'cyanX.100' }}
              >
                Deletar
              </Button>
              <Button
                onClick={onCloseDeleteModalHint}
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
