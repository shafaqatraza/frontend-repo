import {
  Box,
  Button,
  chakra,
  Checkbox,
  Flex,
  FormControl,
  HTMLChakraProps,
  Input,
  Text,
  Stack,
  useColorModeValue as mode,
  Center,
} from "@chakra-ui/react";
import * as React from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { useMutation, QueryClient } from "react-query";
import { PasswordField } from "../../PasswordField";
import { baseUrl } from "../../../../config";
import { useRouter } from 'next/router'

export const LoginForm = (props) => {
  let { setShowModel, show } = props;
  const router = useRouter()
  const queryClient = new QueryClient();
  const toast = useToast();
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: password,
  });
  const mutation = useMutation(
    (formData) => {
      setIsLoading(true);
      return axios.post(`${baseUrl}/login`, formData);
    },
    {
      onSuccess: (data) => {
        let userStatus = data.data.user.user_profile;
        localStorage.setItem("loggedInUser", JSON.stringify(data.data));
        toast({ title: "Login successfully", status: "success" });
        if (router.pathname == '/') {
          router.push('/')
        }

        if (!data.data.user.verified_email) {
          let dubShow = { ...show };
          dubShow.signUp = false;
          dubShow.login = false;
          dubShow.signUpVerification = true;
          setShowModel(dubShow);
          setIsLoading(false);
        } else if (userStatus === null) {
          let dubShow = { ...show };
          dubShow.signUp = false;
          dubShow.login = false;
          dubShow.step1 = true;
          setShowModel(dubShow);
          setIsLoading(false);
        } else {
          let dubShow = { ...show };
          dubShow.login = false;
          setShowModel(dubShow);
          setIsLoading(false);
        }
      },
      onError: (data) => {
        setIsLoading(false);
        let errors = data.response?.data.errors;
        if (errors?.username) {
          errors.username.map((sin) => {
            toast({ title: sin, status: "error" });
          });
        }
        if (errors?.email) {
          errors.email.map((sin) => {
            toast({ title: sin, status: "error" });
          });
        } else {
          data.response?.data?.message &&
            toast({
              title: data.response?.data?.message,
              status: "error",
            });
        }
      },
      // onSettled: () => {
      // queryClient.invalidateQueries("");
      // },
    }
  );

  return (
    <chakra.form
      onSubmit={(e) => {
        e.preventDefault();
        data.password = password;
        mutation.mutate(data);
      }}
      {...props}
    >
      <Stack spacing="10" >

        <FormControl id="email">
          <Input
            name="email"
            type="email"
            autoComplete="email"
            onChange={(e) => {
              let dubData = { ...data };
              dubData.email = e.target.value;
              setData(dubData);
            }}
            required
            placeholder="Email"
            backgroundColor={mode("gray.50", "whiteAlpha.900")}
            height={50}
          />
        </FormControl>

        <PasswordField setPassword={setPassword} />
        <Flex align="center" justify="space-between" mt="8">
          <Checkbox
            size="md"
            colorScheme="orange"
            sx={{
              ".chakra-checkbox__control": {
                "&:not([data-checked])": { bg: mode("gray.50", "gray.700") },
                rounded: "base",
                borderWidth: "1px",
              },
              ".chakra-checkbox__label": { fontSize: "sm" },
            }}
          >
            <Text color="grey.600">Keep me logged in</Text>
          </Checkbox>
        </Flex>
        <Box
          cursor="pointer"
          as="a"
          color={"primary.300"}
          fontWeight="semibold"
          fontSize="lg"
          onClick={() => {
            let dubShow = { ...show };
            dubShow.login = false;
            dubShow.forgotPassword = true;
            setShowModel(dubShow);
          }}
        >
          Forgot your password?
        </Box>
        <Button type="submit" colorScheme="orange" size="lg" fontSize="md" isDisabled={isLoading}>
          Log in
        </Button>

        <Center mb={15}>
          <Text color="grey.500"> {"Don't have an account?"} </Text>{" "}
          <Text
            cursor="pointer"
            ml={2}
            color="primary.300"
            fontWeight="semibold"
            onClick={() => {
              let dubShow = { ...show };
              dubShow.login = false;
              dubShow.signUp = true;
              setShowModel(dubShow);
            }}
          >
            Create one now!
          </Text>
        </Center>
      </Stack>
    </chakra.form>
  );
};
