import React from "react";
import {
    Box,
    Heading,
    Text,
    Button,
    Image,
    Grid,
    GridItem,
    VStack,
    Stack,
} from "@chakra-ui/react";

const HomePage = () => {
    return (
        <Box>
          <Box as="header" p={6} borderBottom="1px solid" borderColor="gray.200">
            <Box maxW="1200px" mx="auto" d="flex" justifyContent="space-between">
              <Heading as="h1" size="lg" color="green.600">
                World Peas
              </Heading>
              <Box d="flex" alignItems="center" spacing={4}>
                <Text mx={4}>Shop</Text>
                <Text mx={4}>Newstand</Text>
                <Text mx={4}>Who we are</Text>
                <Text mx={4}>My profile</Text>
                <Button colorScheme="green" size="sm">
                  Basket (3)
                </Button>
              </Box>
            </Box>
          </Box>

      <VStack spacing={8} py={12} align="center" maxW="1200px" mx="auto">
        <Heading as="h2" size="xl" textAlign="center">
          We’re <Text as="em">farmers, purveyors</Text>, and{" "}
          <Text as="em">eaters</Text> of organically grown food.
        </Heading>
        <Button size="lg" colorScheme="green">
          Browse our shop
        </Button>

        <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
          <GridItem>
            <Image
              src="https://via.placeholder.com/400" // Replace with your image URL or path
              alt="Fresh greens"
              w="100%"
              h="auto"
              objectFit="cover"
            />
          </GridItem>
          <GridItem>
            <Stack>
              <Image
                src="https://via.placeholder.com/400" // Replace with your image URL or path
                alt="Produce stack"
                w="100%"
                h="auto"
                objectFit="cover"
              />
              <Text textAlign="center">
                Central California — The person who grew these was located in
                Central California and, er, hopefully very well-compensated.
              </Text>
            </Stack>
          </GridItem>
        </Grid>
      </VStack>

            <Box py={12} px={4} bg="gray.50">
                <VStack align="start" maxW="1200px" mx="auto" spacing={6}>
                    <Heading as="h3" size="lg">
                        WHAT WE BELIEVE
                    </Heading>
                    <Text fontSize="lg">
                        We believe in produce. Tasty produce. Produce like:
                    </Text>
                    <Text>
                        Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers. Jicamas.
                        Cauliflowers. Brussels sprouts. Shallots. Japanese eggplants.
                        Asparagus. Artichokes—Jerusalem artichokes, too. Radishes. Broccoli.
                        Baby broccoli. Broccolini. Bok choy. Scallions. Ginger. Cherries.
                        Raspberries. Cilantro. Parsley. Dill.
                    </Text>
                    <Text fontSize="lg">What are we forgetting?</Text>
                    <Text>
                        Oh! Onions. Yams. Avocados. Lettuce. Arugula (to some, "rocket").
                        Persian cucumbers, in addition to aforementioned "normal" cucumbers.
                        Artichokes. Zucchinis. Pumpkins. Squash (what some cultures call
                        pumpkins). Sweet potatoes and potato-potatoes. Jackfruit. Monk
                        fruit. Fruit of the Loom. Fruits of our labor (this website).
                        Sorrel. Pineapple. Mango. Gooseberries. Blackberries. Tomatoes.
                        Heirloom tomatoes. Beets. Chives. Corn. Endive. Escarole, which, we
                        swear, we’re vendors of organic produce, but if you asked us to
                        describe what escaroles are…
                    </Text>
                </VStack>
            </Box>
        </Box>
    );
};

export default HomePage;