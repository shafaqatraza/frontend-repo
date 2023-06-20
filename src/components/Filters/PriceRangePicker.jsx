import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderProps,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import React from "react";
import { Slider } from 'antd';

export const PriceRangePicker = (props) => {
  // const value = props.defaultValue || props.value;
  // console.log(props);
  const onChange = () => {

  }
  return (
    <RangeSlider
      colorScheme="yellow"
      step={10}
      aria-label={["minimum price", "maximux price"]}
      {...props}
      _focus={{ boxShadow: "none" }}
      onChange={() => onChange()}
      onChangeEnd={(val) => props.changeRange(val)}
      // defaultValue={props.defaultValue}
    >
      <RangeSliderTrack bg='rgba(226, 120, 50, 0.31)'>
        <RangeSliderFilledTrack bg='rgba(226, 120, 50, 0.61)' />
      </RangeSliderTrack>
      {props.defaultValue?.map((val, index) => (
        <RangeSliderThumb
          w="4"
          h="4"
          borderWidth="1px"
          borderColor="rgba(226, 120, 50, 1)"
          key={index}
          index={index}
          bg='rgba(226, 120, 50, 1)'
          _focus={{ boxShadow: "none" }}
        />
      ))}
    </RangeSlider>
  );
};
