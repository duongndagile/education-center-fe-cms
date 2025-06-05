import { Box, Heading, Text } from "@chakra-ui/react";

export default function DashboardHome() {
  return (
    <Box>
      <Heading size="lg" mb={4}>
        Welcome to the Admin Dashboard
      </Heading>
      <Text color="gray.600">Use the sidebar to manage your content.</Text>
    </Box>
  );
}
