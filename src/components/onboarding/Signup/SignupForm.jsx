import {
  Button,
  Center,
  chakra,
  Checkbox,
  Flex,
  FormControl,
  Input,
  Stack,
  Text,
  InputGroup,
  InputRightElement,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import * as React from "react";
import { useMutation } from "react-query";
import { baseUrl } from "../../../../config";
import { PasswordField } from "../../PasswordField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Link from "next/link";
export const SignupForm = (props) => {
  let { setShowModel, show, refer, userData, setUserData } = props;
  const toast = useToast();
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [promo, setPromo] = React.useState("");
  const [isTermsChecked, setIsTermsChecked] = React.useState(false);
  const [data, setData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: password,
    ref: "",
  });
  const [phone, setPhone] = React.useState();

  const mutation = useMutation(
    (formData) => {
      // formData.append('phone_number', phone)
      formData.phone_number = `${phone}`;
      if (!isTermsChecked) {
        toast({
          title: "Please selected Terms & Services and Privacy Policy",
          status: "error",
        });
      } else {
        console.log("request");
        return axios.post(`${baseUrl}/register`, formData);
      }
    },
    {
      onSuccess: (data) => {
        //  show toaster
        localStorage.setItem("loggedInUser", JSON.stringify(data.data.data));
        let dubData = { ...userData };
        dubData.email = data.data.data.user.email;
        setUserData(dubData);
        // show new model
        let dubShow = { ...show };
        dubShow.signUp = false;
        dubShow.signUpVerification = true;
        setShowModel(dubShow);
        localStorage.removeItem("referCode");
        toast({ title: "sign up successfully", status: "success" });
      },
      onError: (data) => {
        setIsLoading(false);
        data.response?.data?.errors != undefined &&
        data.response?.data?.errors != ""
          ? Object.keys(data.response?.data?.errors).map((keyName, i) =>
              typeof data.response?.data?.errors[keyName] == "object"
                ? toast({
                    title: data.response?.data?.errors[keyName],
                    status: "error",
                  })
                : toast({
                    title: data.response?.data?.errors[keyName][0],
                    status: "error",
                  })
            )
          : data.response?.data?.message &&
            toast({
              title: data.response?.data?.message,
              status: "error",
            });
      },
    }
  );

  return (
    <chakra.form
      onSubmit={(e) => {
        // form validation
        e.preventDefault();
        data.password = password;
        data.ref =
          localStorage.getItem("referCode") !== null
            ? localStorage.getItem("referCode")
            : "";
        setIsLoading(true);

        if (data.email.includes("icloud")) {
          // Found world
          setIsLoading(false);
          toast({
            title: "Icloud email can not be used, please try with other email",
            status: "error",
          });
          return;
        } else {
          if (promo) {
            axios
              .get(`${baseUrl}/promocodes/check/${promo}`)
              .then((res) => {
                toast({
                  title: res.data.message,
                  status: "success",
                });
                localStorage.setItem("promo", promo);
                mutation.mutate(data);
              })
              .catch((error) => {
                toast({
                  title: "Sorry the promo code is not correct or has expired",
                  status: "error",
                });
                setIsLoading(false);
                let exists = localStorage.getItem("promo");
                if (exists) {
                  localStorage.removeItem("promo");
                }
              });
          } else {
            mutation.mutate(data);
          }
        }

        // if (mutation.isError) {
        //   if (mutation?.error?.response?.data.errors?.username) {
        //     mutation.error.response.data.errors.username.map(sin => {
        //       toast({ title: sin, status: "error" });
        //     })
        //   }
        //   if (mutation?.error?.response?.data?.errors?.email) {
        //     mutation.error.response.data.errors.email.map(sin => {
        //       toast({ title: sin, status: "error" });
        //     })
        //   }
        //   else {
        //     mutation.isError && toast({ title: mutation.error.response.data.message, status: "error" });
        //   }
        // }
      }}
      {...props}
    >
      <Stack spacing="6">
        <FormControl id="fname">
          <Input
            name="first name"
            type="name"
            autoComplete="name"
            required
            placeholder="First Name"
            onChange={(e) => {
              let dubData = { ...data };
              dubData.first_name = e.target.value;
              setData(dubData);
            }}
            backgroundColor={mode("gray.50", "whiteAlpha.900")}
            height={50}
          />
        </FormControl>
        <FormControl id="email">
          <Input
            name="last name"
            type="name"
            autoComplete="name"
            required
            placeholder="Last Name"
            onChange={(e) => {
              let dubData = { ...data };
              dubData.last_name = e.target.value;
              setData(dubData);
            }}
            backgroundColor={mode("gray.50", "whiteAlpha.900")}
            height={50}
          />
        </FormControl>
        <FormControl id="email">
          <Input
            type="email"
            autoComplete="email"
            required
            placeholder="Email"
            onChange={(e) => {
              let dubData = { ...data };
              dubData.email = e.target.value;
              setData(dubData);
            }}
            backgroundColor={mode("gray.50", "whiteAlpha.900")}
            height={50}
          />
        </FormControl>
        <PasswordField setPassword={setPassword} />
        <FormControl id="phone">
          <PhoneInput
            containerClass="css-1t1ao6j"
            inputClass="country-dropdown"
            name="phone_number"
            value={phone}
            country={"ca"}
            onChange={setPhone}
          />
          {/* <Input
            name="phone_number"
            type="phone"
            autoComplete="phone"
            required
            placeholder="Phone Number"
            onChange={(e) => {
              let dubData = { ...data }
              dubData.phone_number = e.target.value
              setData(dubData)
            }}
            backgroundColor={mode('gray.50', 'whiteAlpha.900')}
            height={50}
          /> */}
        </FormControl>

        <FormControl id="promo">
          <Input
            containerClass="css-1t1ao6j"
            placeholder="Enter promo code (Optional)"
            name="promo"
            onChange={(e) => setPromo(e.target.value)}
            height={50}
          />
        </FormControl>
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
            <Text color="grey.600">
            I will be volunteering and require a completion certificate
            </Text>
          </Checkbox>
        </Flex>
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
            <Text color="grey.600">
              I would like to receive your newsletter and other promotional
              information.
            </Text>
          </Checkbox>
        </Flex>

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
            onChange={(e) => setIsTermsChecked(e.target.checked)}
          >
            <Text color="grey.600">
              I agree to the Terms & Services and{" "}
              <span style={{textDecoration: "none" }}>
                <a href="/privacy-policy" target="_blank">
                  {" "}
                  Privacy Policy{" "}
                </a>{" "}
              </span>
            </Text>
          </Checkbox>
        </Flex>

        <Button
          type="submit"
          colorScheme="orange"
          size="lg"
          fontSize="md"
          disabled={isLoading}
        >
          Create Account
        </Button>

        <Center mb={15}>
          <Text color="grey.500"> {"Already have an account?"} </Text>{" "}
          <Text
            cursor="pointer"
            ml={2}
            color="primary.300"
            fontWeight="semibold"
            onClick={() => {
              let dubShow = { ...show };
              dubShow.login = true;
              dubShow.signUp = false;
              setShowModel(dubShow);
            }}
          >
            Log In!
          </Text>
        </Center>
      </Stack>
    </chakra.form>
  );
};
