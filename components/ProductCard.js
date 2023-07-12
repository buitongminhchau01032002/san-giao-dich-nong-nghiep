import { useNavigation } from '@react-navigation/native';
import { Box, Image, Pressable, Text } from 'native-base';
import NAVIGATION_KEY from '../constants/NavigationKey';

export default function ProductCard({ product }) {
    const navigation = useNavigation();
    function handlePress() {
        navigation.navigate(NAVIGATION_KEY.DetailProduct, { product });
    }
    return (
        <Pressable borderRadius={10} bg="white" onPress={handlePress}>
            <Image
                bg="gray.300"
                borderRadius={8}
                src={product.image}
                alt={product.name}
                w="full"
                h="150"
                resizeMode="cover"
            />
            <Box p={2}>
                <Text isTruncated>{product.name}</Text>
                <Text bold color="primary.600">
                    {product.price}₫
                </Text>
            </Box>
        </Pressable>
    );
}
