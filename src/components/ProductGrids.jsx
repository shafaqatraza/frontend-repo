import { SimpleGrid } from '@chakra-ui/react'
import * as React from 'react'

const ProductGrids = (props) => {


    return (
        <SimpleGrid
            columns={{ base: "2", md: "3", lg: "4", xl: "5" }}
            columnGap={{ base: '4', md: '7' }}
            rowGap={{ base: '8', md: '10' }}
            {...props}
        />
    )
}
export default ProductGrids;
