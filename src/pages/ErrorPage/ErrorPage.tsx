import { Box, LinkBox, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { TemplateScreen } from '../../components/TemplateScreen/TemplateScreen';

export default function ErrorPage() {
  return (
    <TemplateScreen>
      <Box textColor='whiteX.100' textAlign='center'>
        <Text>Not Found page!</Text>
        <LinkBox textDecoration='underline'>
          <Link to='/'>Back to the login screen!</Link>
        </LinkBox>
      </Box>
    </TemplateScreen>
  );
}
