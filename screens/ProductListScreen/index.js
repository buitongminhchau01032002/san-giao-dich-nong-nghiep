import { Box,Heading,Text,View} from 'native-base';
import React from 'react';
import ProductListGrid from '../../components/ProductListGrid';
import ProductSearchBar from '../../components/ProductSearchBar';

function ProductListScreen() {
    return (
        <Box flex={1}>
            <Heading
            pl={5}
            pt={7}
            pb={2}
            fontSize={28}
            >
                Trái cây
            </Heading>
            
            <ProductSearchBar></ProductSearchBar>
            <ProductListGrid/>
            
        </Box>
    )
}

export default ProductListScreen;