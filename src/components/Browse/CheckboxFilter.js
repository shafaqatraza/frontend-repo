import {
    Box,

    CheckboxGroup,
    FormLabel,
    Stack,
    useColorModeValue as mode,
} from "@chakra-ui/react";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { Checkbox } from 'antd'

export const CheckboxFilter = (props) => {
    const {
        options,
        label,
        hideLabel,
        spacing = "2",
        showSearch,
        ...rest
    } = props;

    return (
        <Stack as="fieldset" mt={4} spacing={spacing}>
            {!hideLabel && (
                <FormLabel fontWeight="semibold" as="legend" mb="0">
                    {label}
                </FormLabel>
            )}
            <Checkbox.Group value={props.defaultValue} className="browse-checkbox" onChange={props.onCheckboxChange}>
            <div className="row">
                    {options.map((option) => (
                        <div className="col-md-6">
                        <Box>
                            <Checkbox
                                key={option.id}
                                value={option.id}
                            >
                                <span>{option.name}</span>
                            </Checkbox>
                        </Box>     
                        </div>
                    ))}
            </div>
            </Checkbox.Group>
        </Stack>
    );
};