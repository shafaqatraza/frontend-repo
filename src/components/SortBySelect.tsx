import { Select, SelectProps, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";

const sortByOptions = {
  defaultValue: "most-recent",
  options: [
    { label: "Date (Most Recent)", value: "most-recent" },

    { label: "Credit Amount (Low to High)", value: "low-to-high" },
    { label: "Credit Amount (High to Low)", value: "high-to-low" },
  ],
};

export const SortbySelect = (props: SelectProps) => (
  <Select
    size="md"
    aria-label="Sort by"
    defaultValue={sortByOptions.defaultValue}
    focusBorderColor={useColorModeValue("primary.300", "primary.200")}
    rounded="md"
    {...props}
    mx={1}
  >
    {sortByOptions.options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </Select>
);
