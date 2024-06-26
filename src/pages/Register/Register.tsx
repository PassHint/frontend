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
import { ChangeEvent, useRef, useState } from 'react';
import { ValidationError } from 'yup';
import { TemplateScreen } from '../../components/TemplateScreen/TemplateScreen';
import { registerFormSchema } from '../../validation';
import { routes } from '../../routes';
import { AxiosError } from 'axios';
import { sleep } from '../../utils';

export default function Register() {
  const formUsernameRef = useRef<HTMLInputElement>(null);
  const formPassWordRef = useRef<HTMLInputElement>(null);
  const formPasswordConfirmRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const [strongPassword, setStrongPassword] = useState<{
    color: string;
    message: string;
  }>({
    color: "blackX.200",
    message: "Verificador de senha",
  });
  function getPasswordStrength(event: ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    switch (strength) {
      case 0:
      case 1:
        setStrongPassword({ color: "red.600", message: "Fraca" });
        return { color: "red", message: "Fraca" };
      case 2:
        setStrongPassword({ color: "orange.500", message: "Média" });
        return { color: "yellow", message: "Média" };
      case 3:
        setStrongPassword({ color: "yellow.500", message: "Quase lá" });
        return { color: "yellow", message: "Quase lá" };
      case 4:
        setStrongPassword({ color: "green.600", message: "Forte" });
        return { color: "green", message: "Forte" };
      default:
        setStrongPassword({ color: "transparent", message: "" });
        return { color: "red", message: "Fraca" };
    }
  }
  async function validateDate() {
    const usernameValue = formUsernameRef.current?.value || '';
    const passwordValue = formPassWordRef.current?.value || '';
    const passwordConfirmValue = formPasswordConfirmRef.current?.value || '';

    try {
      await registerFormSchema.validate({
        username: usernameValue,
        password: passwordValue,
        confirmPassword: passwordConfirmValue,
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

    await createUser({ username: usernameValue, password: passwordValue });
  }

  async function createUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    try {
      const { data: response, status } = await routes.create_user({
        username,
        password,
      });
      if (status !== 201) {
        return toast({
          title: 'Error!',
          description: response.error.message,
          status: 'warning',
          duration: 2000,
          position: 'top',
          isClosable: true,
        });
      }
      toast({
        title: 'Sucesso!',
        description: 'Conta criada com sucesso!',
        status: 'success',
        duration: 2000,
        position: 'top',
        isClosable: true,
      });
      await sleep(1000);
      return (window.location.href = '/');
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast({
          title: 'Aviso!',
          description:
            error.response?.data.error.code == 1002 &&
            'Nome de usuário já existe!',
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
            Registrar-se
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
                required
                _focus={{ boxShadow: 'none', borderColor: 'cyanX.100' }}
              />
            </Box>
            <Box>
              <FormLabel fontWeight='normal'>Senha:</FormLabel>
              <Input 
                onChange={(event)=>getPasswordStrength(event)}
                type='password'
                ref={formPassWordRef}
                placeholder='Digite a senha'
                _focus={{ boxShadow: 'none', borderColor: 'cyanX.100' }}
              />
            </Box>
            <Box>
              <FormLabel fontWeight='normal'>Confirme sua senha:</FormLabel>
              <Input
                type='password'
                ref={formPasswordConfirmRef}
                placeholder='Confirme a senha'
                _focus={{ boxShadow: 'none', borderColor: 'cyanX.100' }}
              />
            </Box>
            <Box
              borderRadius="10px"
              padding="0.5rem"
              width="100%"
              backgroundColor={strongPassword.color}
            >
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
                Já possui uma conta?
              </FormHelperText>
              <FormHelperText
                textColor='cyanX.100'
                textDecoration='underline'
              >
                <Link to='/'>Acessar com uma conta existente</Link>
              </FormHelperText>
            </Box>
          </Flex>
        </FormControl>
      </Box>
    </TemplateScreen>
  );
}
