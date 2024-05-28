import { RefObject } from "react";
import { QuestionIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormLabel, Image, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import { InterfaceHint } from "../../interfaces";


interface PropsHintModal {
  fiveIconWebsite: string | null,
  formWebSiteRef: RefObject<HTMLInputElement>,
  formHintRef: RefObject<HTMLTextAreaElement>,
  isOpenModalHint: boolean,
  onCloseModalHint: () => void,
  handleIconWebsite: () => void,
  validateHint: () => void
  hint?: InterfaceHint
}

export default function HintModal({ fiveIconWebsite, formHintRef, formWebSiteRef, isOpenModalHint, onCloseModalHint, handleIconWebsite, validateHint, hint }: PropsHintModal) {
  return (
    <Modal
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
              defaultValue={hint?.source}
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
            defaultValue={hint?.content}
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
  </Modal>
  )
}