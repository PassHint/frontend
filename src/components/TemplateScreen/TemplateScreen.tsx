import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface TemplateScreenProps {
  children: ReactNode;
}

export function TemplateScreen({ children }: TemplateScreenProps) {
  return (
    <Flex
      background='blackX.100'
      height='100vh'
      justifyContent='center'
      alignItems='center'
    >
      {children}
    </Flex>
  );
}
