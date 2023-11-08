import { Center } from "@chakra-ui/react";
import { Pagination } from 'antd';

import * as React from "react";

export const PaginationSection = (props) => {
    const { meta, currentPage, changeCurrentPage } = props;
    return (
        <>
            {meta.per_page < meta.total &&
                <Center mt={20}>
                    <Pagination
                        className="pagination-style"
                        current={currentPage}
                        total={meta.total}
                        onChange={changeCurrentPage}
                    />
                </Center>
            }
        </>
    );
};
