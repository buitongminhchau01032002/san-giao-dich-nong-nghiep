import { Button, HStack, NumberInputStepper, ScrollView, Text, View } from 'native-base';
import QuantityInput from './components/QuantityInput';
import { useEffect, useState } from 'react';

const PRODUCT = {
    name: 'Hạt điều nâu cao cấp nhập khẩu',
    category: {
        name: 'Trái cây',
    },
    seller: {
        address: 'Thành phố Hồ Chí Minh',
        brandName: 'Hạt điều cho mọi nhà',
        scale: '100 ha',
        capicity: '1000 tấn',
    },
    description: 'Sản phẩm chất lượng nhất thế giới',
    minPurchase: 10,
    price: 100000,
    unit: 'gói',
};

function DetailProductScreen() {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    useEffect(() => {
        setProduct(PRODUCT);
        // TODO: call api
    }, []);
    return (
        <View position="relative">
            <ScrollView>
                <Text pb={100}>fasdfasdfasdfsadfsad</Text>
                <Text pb={100}>fasdfasdfasdfsadfsad</Text>
                <Text pb={100}>fasdfasdfasdfsadfsad</Text>
                <Text pb={100}>fasdfasdfasdfsadfsad</Text>
                <Text pb={100}>fasdfasdfasdfsadfsad</Text>
                <Text pb={100}>fasdfasdfasdfsadfsad</Text>
                <Text pb={100}>fasdfasdfasdfsadfsad</Text>
                <Text pb={100}>fasdfasdfasdfsadfsad</Text>
                <Text pb={100}>fasdfasdfasdfsadfsad</Text>
            </ScrollView>

            <HStack
                justifyContent="space-between"
                alignItems="center"
                px="5"
                h="60"
                bg="white"
                position="absolute"
                bottom="0"
                left="0"
                right="0"
            >
                <QuantityInput value={quantity} setValue={setQuantity} min={1} max={product?.minPurchase || 100} />
                <Button>Thêm vào giỏ hàng</Button>
            </HStack>
        </View>
    );
}

export default DetailProductScreen;
