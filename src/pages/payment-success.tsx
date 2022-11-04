import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Text
} from '@chakra-ui/react';
import NextHeadSeo from "next-head-seo";
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

const PaymentSuccess = () => {
  return (
    <>
      <NextHeadSeo
        title="Payment success page - Courtcanva"
        description="Payment successful page on CourtCanva"
        canonical="http://www.courtcanva.com/payment-success"
      />
      <Box
        height="calc(100vh - 72px)"
        width="100vw"
        position="fixed"
        top="72px"
        color="brand.primary"
        minWidth="800px"
        minHeight="600px"
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={{ base: "2rem", md: "2.5rem", lg: "3rem" }}
          marginTop="7vh"
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            gap={{ base: "0.5rem", md: "0.9rem", lg: "1.3rem" }}
          >
            <Box fontSize={{ base: "2.4rem", md: "3rem", lg: "3.6rem" }} color="brand.secondary" >
              <IoIosCheckmarkCircleOutline />
            </Box>
            <Text fontSize={{ base: "1.6rem", md: "2rem", lg: "2.4rem" }} fontWeight="600"
            >
              Payment Successful
            </Text>
          </Flex>
          <Flex
            boxShadow="4px 4px 8px rgba(0, 0, 0, 0.25), -4px -4px 8px #EBECF0"
            width="90vw"
            height="45vh"
            borderRadius="1rem"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-around"
            paddingTop="1rem"
            minWidth="720px"
          >
            <Text fontSize={{ base: "1.2rem", md: "1.5rem", lg: "1.8rem" }} fontWeight="600" lineHeight="1">
              Thank you!
            </Text>
            <Text fontSize={{ base: "0.7rem", md: "0.9rem", lg: "1.1rem" }} fontWeight="600">
              You have successfully paid the deposit. Our staff will contact you soon.
              <Box height="1rem"></Box>
            </Text>
            <Box
              height="0.1rem"
              background="black"
              width="calc(100% - 30vw)"
            ></Box>
            <Grid
              width="60%"
              height="45%"
              templateColumns="minmax(120px, 1.6fr) minmax(120px, 1.6fr) minmax(80px, 1fr)"
              templateRows="1fr 1fr"
              lineHeight={1.2}
              columnGap="2rem"
              rowGap="0.8rem"
            >
              <GridItem paddingTop="1rem" >
                <Text
                  fontSize={{ base: "0.6rem", lg: "0.8rem" }}
                  fontStyle="italic"
                  fontWeight="250"
                >
                  Order ID
                </Text>
                <Text
                  minWidth="100%"
                  fontSize={{ base: "0.8rem", lg: "1rem" }}
                  fontWeight="700"
                >
                  63636bcf32d999e97f1c25d0
                </Text>
              </GridItem>
              <GridItem paddingTop="1rem">
                <Text
                  fontSize={{ base: "0.6rem", lg: "0.8rem" }}
                  fontStyle="italic"
                  fontWeight="250"
                >
                  Created at
                </Text>
                <Text
                  fontSize={{ base: "0.8rem", lg: "1rem" }}
                  fontWeight="700"
                >
                  12/08/2022 12:42
                </Text>
              </GridItem>
              <GridItem
                rowSpan={2}
              >
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  height="100%"
                  paddingBottom="1rem"
                >
                  <Text
                    fontSize={{ base: "0.6rem", lg: "0.8rem" }}
                    fontStyle="italic"
                    fontWeight="250"
                  >
                    Deposit
                  </Text>
                  <Text
                    fontSize={{ base: "0.8rem", lg: "1rem" }}
                    fontWeight="700"
                  >
                    A$100000.00
                  </Text>
                </Flex>
              </GridItem>
              <GridItem >
                <Text
                  fontSize={{ base: "0.6rem", lg: "0.8rem" }}
                  fontStyle="italic"
                  fontWeight="250"
                >
                  Status
                </Text>
                <Text
                  fontSize="1rem"
                  fontWeight="700"
                  color="brand.secondary"
                >Paid</Text>
              </GridItem>
              <GridItem >
                <Text
                  fontSize={{ base: "0.6rem", lg: "0.8rem" }}
                  fontStyle="italic"
                  fontWeight="250"
                >
                  Paid at
                </Text>
                <Text
                  fontSize={{ base: "0.8rem", lg: "1rem" }}
                  fontWeight="700"
                >
                  12/08/2022 12:42
                </Text>
              </GridItem>
            </Grid>
          </Flex>
          <Button
            variant="shareBtn"
            padding="1rem 1.5rem"
            fontSize="1.2rem"
          >
            Check My Order
          </Button>
        </Flex>
      </Box>
    </>
  )
}

export default PaymentSuccess;