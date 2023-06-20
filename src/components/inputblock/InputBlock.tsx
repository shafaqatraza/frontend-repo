import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  FormControl
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

interface IfirstChildProps {
  setType: any,
  type: string,
}

export const InputBlock: React.FC<IfirstChildProps> = (props: any) => {
  const router = useRouter();
  const [searchValue, setSearch] = React.useState<any>("");
  const [isSearchEmpty, setSearchEmpty] = React.useState<any>(false);

  const onSearch = () => {
    if (searchValue) {
      setSearchEmpty(false);
      if (props.show) {
        let dubShow = { ...props.show }
				dubShow.drawer = false;
				props.setShowModel(dubShow);
      }
      router.push(`/search?type=offering&search=${searchValue}`)
    } else {
      setSearchEmpty(true);
    }
  }

  return (
    <Box py={5} >
      <FormControl
        onKeyPress={e => {
          if (e.key === 'Enter') {
            onSearch();
          }
        }}
      >
        <InputGroup maxW="600px" m="auto">
          <Input
            bg="gray.50"
            placeholder="Search"
            height="56px"
            value={searchValue}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <InputRightElement w="7rem" height="56px">
            <Select onChange={(e) => props.setType(e.target.value)} defaultValue={props.type} bg="white" borderLeftRadius="none" height="56px">
              <option value="offering">Offering</option>
              <option value="wanted">Wanted</option>

            </Select>
          </InputRightElement> */}
        </InputGroup>
      </FormControl>
      <Box maxW="600px" margin="auto">
        {isSearchEmpty && (
          <Text color="red.400">
            Please type something to search
          </Text>
        )}
      </Box>
    </Box>
  );
};
