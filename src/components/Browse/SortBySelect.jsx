import { SelectProps, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { Select } from 'antd';

const { Option } = Select;

const sortByOptions = {
  defaultValue: "most_recent",
  options: [
    { label: "Date (Most Recent)", value: "most_recent" },

    { label: "Credit Amount (Low to High)", value: "low_to_hight" },
    { label: "Credit Amount (High to Low)", value: "high_to_low" },
  ],
};

export const SortbySelect = (props) => (
  <Select
    value={props.defaultValue}
    dropdownClassName={"browse-select"}
    style={{ width: "100%" }}
    onChange={(e) => props.changeSortBy(e)}
  >
    {sortByOptions.options.map((option) => (
      <Option key={option.value} value={option.value}> {option.label}</Option>
    ))}
  </Select>
);
