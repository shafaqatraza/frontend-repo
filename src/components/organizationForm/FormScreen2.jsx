import React, {useEffect} from 'react';
import { useOrganizationFormContext } from './organizationFormContext';
import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
  ModalHeader,
  Center,
  Icon,
  useColorModeValue as mode,
  Box,
  FormErrorMessage,
  Spacer,
  Text,
  Flex,
  Tag
} from '@chakra-ui/react';
import { FiX, FiCheck } from 'react-icons/fi';
import { Form, Field , useField} from 'react-final-form';
import Upload from './uploadComponent';
import validate from './validate';
import axios from 'axios';
import { accessToken, baseUrl} from '../Helper/index'
import { useToast } from '@chakra-ui/toast'
import { debounce } from 'lodash';
const FormScreen2 = () => {
  const { setCurrentStep, openModal, organizationSlug } = useOrganizationFormContext();
  const toast = useToast()
  const [avatar, setAvatar] = React.useState();
  const [isAvatarAvailable, setAvatarAvailablity] = React.useState();
  const [usernameAvailable, setUsernameAvailable] = React.useState();
  const [suggestedUsername, setSuggestedUsername] = React.useState();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [userNameError, setUserNameError] = React.useState();
  const [username, setUsername] = React.useState();
  const [formData, setFormData] = React.useState({
    organization_name: "",
    work_email: "",
    phone_number: "",
    organization_type: 1,
    charity_registration_number: "",
  });



  const InputControl = ({ name, label }) => {
    const { input, meta } = useField(name);
  
    return (
      <Control name={name} my={4} position="relative">
        <FormLabel color="#BDBDBD" htmlFor={name}>
          Organization Username
        </FormLabel>
        <Input
          {...input}
          isInvalid={usernameAvailable === false || usernameAvailable === null}
          id={name}
          placeholder={label}
          backgroundColor={mode('gray.50', 'whiteAlpha.900')}
          height={50}
          onBlur={(e) => usernameSuggest(e.target.value)}
        />
        {usernameAvailable === false && (
          <>
            <Flex gap='3' className='mt-3'>
              {suggestedUsername?.map((usernames, index) => (
                <Tag
                  key={index}
                  variant='solid'
                  colorScheme='orange'
                  onClick={() => {
                    navigator.clipboard.writeText(`${usernames}`);
                    toast({ title: 'Username copied', status: 'success' });
                  }}
                  className='cursor-pointer'
                >
                  {' '}
                  {usernames}{' '}
                </Tag>
              ))}
            </Flex>
          </>
        )}
        <div style={{ position: 'absolute', top: '45px', right: '10px', zIndex: 10 }}>
          {meta.error || usernameAvailable === false || usernameAvailable === null ? (
            <Icon as={FiX} color='#E74C3C' fontSize='20px' transition='all 0.15s ease' />
          ) : input.value || usernameAvailable === true ? (
            <Icon as={FiCheck} color='green' fontSize='20px' transition='all 0.15s ease' />
          ) : null}
        </div>
      </Control>
    );
  };

  const Control = ({ name, ...rest }) => {
    const { meta: { error, touched } } = useField(name, { subscription: { touched: true, error: true } });
    return <FormControl {...rest} isInvalid={error && touched} />;
  };

  const usernameSuggest = (e) => {
    setUsername(e)
    axios.get(`${baseUrl}/organization-unique-username?username=${e}&org=${organizationSlug}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken()
      }
    }).then((res) => {
      setUsernameAvailable(res.data.available)
      
      if (res.data.available == false) {
        setSuggestedUsername(res.data.suggestions);
        setUserNameError('This username is already in use. Please make it unique or choose from the suggestions provided.')
      }else{
        setUserNameError('')
      }

    }).catch((error) => {
      setUserNameError(error.response.data.errors.username[0]);
      setUsernameAvailable(null)
      
    })
  }


  const handleNext = async(e) => {
  
    e.preventDefault();

    const form = new FormData();
   
    if(!username){ 
      setUsernameAvailable(null)
      return;
    }
    
    if(userNameError){
      return;
    }

    setIsSubmitting(true);

    form.append("username", username);
    
    if (avatar) {
      form.append("profile_picture", avatar);
      setAvatarAvailablity(true);
    }else {
      setAvatarAvailablity(false);
      toast({ title: "Profile image is required", status: "error" })
      return;
    }
    
    
    try {
        const response = await fetch(`${baseUrl}/organizations/create-profile/${organizationSlug}`, {
            method: 'POST',
            headers: {
              Authorization: "Bearer " + accessToken(),
            },
            body: form,
        });
       
        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Failed to create Organization:', errorResponse.error);
            toast({ title: 'Sorry, something went wrong. Please try again later.', status: 'error', position: 'top' });
            setIsSubmitting(false);
            return;
        }

        const data = await response.json();
        setCurrentStep(3);
        openModal();

    } catch (error) {
        setIsSubmitting(false)
        toast({ title: 'Sorry, something went wrong. Please try again later.', status: 'error', position: 'top' });
        console.error('An unexpected error occurred:', error);
    }

  };

  return (
    <>
      <ModalHeader textAlign="center" py={3}  fontSize="30px">
        Create Profile
      </ModalHeader>
      <Form
        onSubmit={handleNext}
        validate={validate}
        render={({ handleSubmit }) => (
          <chakra.form onSubmit={handleSubmit}>
            <Stack spacing="6">
              <FormControl id="username">
                <InputControl
                  name="username"
                  label="Username"
                  type="text"
                  placeholder="Username"
                />

                {userNameError? <p style={{color:'red'}} className='text text-danger text-align-center'>{userNameError}</p>:''}
              </FormControl>

              <FormControl id="fname">
                <FormLabel
                  textAlign="center"
                  color="#BDBDBD"
                  // marginTop={`${isMobile ? "65px" : ""}`}
                >
                  Upload a Logo
                </FormLabel>
                <Upload />
                <Center>
                    <Upload setAvatar={setAvatar} isAvatarAvailable={isAvatarAvailable} />
                </Center>
              </FormControl>

              <Button
                type="submit"
                width="full"
                mb="6"
                colorScheme="orange"
                size="lg"
                fontSize="md"
                onClick={handleNext}
                disabled={isSubmitting}
              >
                <span id="button-text">
                      {isSubmitting ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> : "Next"}
                </span>
              </Button>
            </Stack>
          </chakra.form>
        )}
      />
    </>
  );
};

export default FormScreen2;
