import { Flex, Box, Text, Stack, Badge, Button } from "@chakra-ui/react";
import Image from "next/image";
import formatCurrency from "@/utils/formatCurrency";
import { downloadToPDF } from "@/utils/printConstruction";
import { useState } from "react";

const MyOrderItem = ({ ...mergedItem }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = async () => {
    setIsDownloading(true);
    await downloadToPDF(mergedItem.design, mergedItem.constructionDrawing);
    setIsDownloading(false);
  };
  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex width="85%" minHeight="150px">
        <Flex width="25%" alignItems="center" justifyContent="space-around" direction="column">
          <Text variant="textFont">{mergedItem.design.designName}</Text>
          <Flex justifyContent="space-around">
            <Text width="100px" mr="30px" align="center" fontSize="14px">
              Construction Drawing
            </Text>
            <Button
              variant="outline"
              borderColor="black"
              width="100px"
              my="auto"
              onClick={handleDownload}
              isLoading={isDownloading}
            >
              Download
            </Button>
          </Flex>
        </Flex>
        <Flex flexDirection="column" width="50%" alignItems="center">
          <Box width="100%" height="100%" position="relative">
            <Image
              src={mergedItem.image}
              alt={`${mergedItem.design.designName} image`}
              layout="fill"
              objectFit="contain"
              placeholder="blur"
              blurDataURL="https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg"
            ></Image>
          </Box>
          <Stack direction="row">
            <Badge backgroundColor="tag.courtCategory" fontSize={{ base: "10px", lg: "11px" }}>
              {mergedItem.design.courtSize.name}
            </Badge>
            <Badge backgroundColor="tag.courtType" fontSize={{ base: "10px", lg: "11px" }}>
              {mergedItem.design.courtType}
            </Badge>
          </Stack>
        </Flex>
        <Flex flexDirection="column" gap="10px" width="25%" justifyContent="center">
          <Flex flexDirection="column">
            <Text variant="textFont" fontStyle="italic" fontWeight="300">
              Quotation
            </Text>
            <Text variant="textFont">{formatCurrency(mergedItem.quotation)}</Text>
          </Flex>
          <Flex flexDirection="column">
            <Text variant="textFont" fontStyle="italic" fontWeight="300">
              Deposit
            </Text>
            <Text variant="bodyFont">
              {formatCurrency((mergedItem.quotation * mergedItem.orderDepositRatio).toFixed(2))}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default MyOrderItem;
