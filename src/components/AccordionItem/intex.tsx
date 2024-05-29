import { AccordionButton, Image } from '@chakra-ui/react';
import { InterfaceHint } from '../../interfaces';

export default function AccordionItem(hint: InterfaceHint) {
  return (
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
        <Flex
          flexDirection='row'
          justifyItems='top'
          gap='1rem'
          justifyContent='space-between'
        >
          <Text>{hint.content}</Text>
          <Flex flexDirection='column' gap='.5rem'>
            <Button
              background='transparent'
              padding='0'
              _hover={{ background: 'cyanX.100' }}
              _focus={{ background: 'cyanX.100' }}
              onClick={() => {
                setHintFocus(hint);
                onOpenDeleteModalHint();
              }}
            >
              <DeleteIcon textColor='whiteX.100' />
            </Button>
            <Button
              background='transparent'
              padding='0'
              _hover={{ background: 'cyanX.100' }}
              _focus={{ background: 'cyanX.100' }}
              onClick={() => openHintModel(hint)}
            >
              <QuestionIcon textColor='whiteX.100' />
            </Button>
          </Flex>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}
