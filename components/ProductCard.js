import { Box, Image, Pressable, Text } from 'native-base';

export default function ProductCard({ product }) {
    return (
        <Pressable maxW="200" key={product._id} borderRadius={10} backgroundColor="white" overflow={'hidden'}>
            <Image borderRadius={8} src={product.image} alt={product.name} w="full" h="100" resizeMode="cover" />
            <Box px={2} pt={1}>
                <Text mt={1} w="full">
                    {product.name}
                </Text>
            </Box>
        </Pressable>
    );
}
