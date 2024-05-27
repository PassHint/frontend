import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ValidationError } from 'yup';
import { useRef } from 'react';
import { TemplateScreen } from '../../components/TemplateScreen/TemplateScreen';
import { loginFormSchema } from '../../validation';

export default function Login() {
  const formUsernameRef = useRef<HTMLInputElement>(null);
  const formPassWordRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  async function validateDate() {
    const usernameValue = formUsernameRef.current?.value;
    const passwordValue = formPassWordRef.current?.value;

    try {
      await loginFormSchema.validate({
        username: usernameValue,
        password: passwordValue,
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
        maxWidth='25rem'
        p='6'
        rounded='md'
        textColor='whiteX.100'
      >
        <Box marginBottom='1rem'>
          <Text
            textAlign='center'
            fontSize='2rem'
            fontWeight='bold'
            borderBottom='1px solid'
            borderColor='cyanX.200'
          >
            PassHint
          </Text>
          <Text textAlign='center' fontSize='1.2rem' fontWeight='normal'>
            Logar-se
          </Text>
        </Box>
        <FormControl isRequired>
          <Flex flexDirection='column' gap='2rem'>
            <Box>
              <FormLabel fontWeight='normal'>Nome de usuário:</FormLabel>
              <Input
                type='text'
                ref={formUsernameRef}
                placeholder='Digite o username'
                _focus={{ boxShadow: 'none', borderColor: 'cyanX.100' }}
              />
            </Box>
            <Box>
              <FormLabel fontWeight='normal'>Senha:</FormLabel>
              <Input
                type='password'
                ref={formPassWordRef}
                placeholder='Digite a senha'
                _focus={{ boxShadow: 'none', borderColor: 'cyanX.100' }}
              />
            </Box>
            <Button
              type='submit'
              background='cyanX.200'
              textColor='whiteX.100'
              fontWeight='normal'
              letterSpacing='.9px'
              _hover={{ background: 'cyanX.100' }}
              onClick={validateDate}
            >
              Registrar
            </Button>
            <Box textAlign='center'>
              <FormHelperText textColor='cyanX.200'>
                Ainda não possui uma conta?
              </FormHelperText>
              <FormHelperText
                textColor='cyanX.100'
                textDecoration='underline'
              >
                <Link to='/register'>Criar uma conta</Link>
              </FormHelperText>
            </Box>
          </Flex>
        </FormControl>
      </Box>
    </TemplateScreen>
  );
}
