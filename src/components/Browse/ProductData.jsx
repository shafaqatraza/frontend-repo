import { Center, Spinner } from "@chakra-ui/react";
import * as React from "react";
import { ProductSingleCard } from "../../components/ProductSingleCard";


export const ProductData = (props) => {
    return (
        <>
            {props.products.map((product, index) => {
                return (
                    <ProductSingleCard
                        key={product.id}
                        product={product}
                    />
                )
            }
            )}
        </>
    )
}


