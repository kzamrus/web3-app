import { Box, Container } from '@mui/material';
import { Logo } from 'modules/layout';

export function SimpleHeader(): JSX.Element {
  return (
    <Box component="header" sx={{ pt: { xs: 3, md: 5 }, pb: 2 }}>
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box component={Logo} sx={{ height: 28 }} />
      </Container>
    </Box>
  );
}
