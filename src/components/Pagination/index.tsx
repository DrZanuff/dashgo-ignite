import { Button, Box, HStack, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  currentPage = 1,
  registerPerPage = 10,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registerPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingCount, lastPage)
        )
      : [];

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <HStack spacing="2">
        {currentPage > 1 + siblingCount && (
          <>
            <PaginationItem number={1} />
						{ currentPage > ( 2 + siblingCount) && 
							<Text
								color="gray.300" width="8" textAlign="center"
							>...</Text>
						}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => {
            return <PaginationItem key={page} number={page} />;
          })}

        <PaginationItem number={currentPage} isCurrent />

        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return <PaginationItem key={page} number={page} />;
          })}

        {currentPage + siblingCount < lastPage && (
					<>
						{ (currentPage + 1 + siblingCount ) < lastPage && 
							<Text
								color="gray.300" width="8" textAlign="center"
							>...</Text>
						}
          	<PaginationItem number={lastPage} />
					</>
        )}
      </HStack>
    </Stack>
  );
}
