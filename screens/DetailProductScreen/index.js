import { Button, Divider, HStack, Image, NumberInputStepper, ScrollView, Text, View } from 'native-base';
import QuantityInput from './components/QuantityInput';
import { useEffect, useState } from 'react';

const PRODUCT = {
    name: 'Hạt điều nâu cao cấp nhập khẩu, chính hãng giá rẻ',
    image: 'https://plus.unsplash.com/premium_photo-1663850873179-6a3ebbd8fe47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZnJ1aXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    category: {
        name: 'Trái cây',
    },
    seller: {
        address: 'Thành phố Hồ Chí Minh',
        brandName: 'Hạt điều cho mọi nhà',
        scale: '100 ha',
        capicity: '1000 tấn',
    },
    quantity: 100,
    description:
        'Sản phẩm chất lượng nhất thế giới, Sản phẩm chất lượng nhất thế giới, Sản phẩm chất lượng nhất thế giới',
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
        <View position="relative" flex={1}>
            <View pb="60">
                <ScrollView px="3">
                    <Image
                        source={{ uri: product?.image }}
                        alt=""
                        mt="3"
                        w="full"
                        h="300"
                        rounded="md"
                        resizeMode="cover"
                    />
                    <Text fontSize="22" fontWeight="bold" mt="3">
                        {product?.name}
                    </Text>
                    <Text fontSize="20" fontWeight="semibold" mt="2" color="primary.600">
                        {product?.price + '₫ / ' + product?.unit}
                    </Text>
                    <Text
                        mt="1"
                        fontSize="16"
                        color="gray.700"
                        fontWeight="medium"
                    >{`Còn lại: ${product?.quantity} ${product?.unit}`}</Text>
                    <Divider my="2" />
                    <Text fontSize="16" fontWeight="medium">
                        Được cung cấp bởi:
                    </Text>
                    <Text mt="1" fontSize="18" color="primary.600" fontWeight="semibold">
                        {product?.seller?.brandName}
                    </Text>
                    <Text mt="1" color="gray.700" fontWeight="medium">{`Địa chỉ: ${product?.seller?.address}`}</Text>
                    <Text mt="1" color="gray.700" fontWeight="medium">{`Quy mô: ${product?.seller?.scale}`}</Text>
                    <Text mt="1" color="gray.700" fontWeight="medium">{`Sản lượng: ${product?.seller?.capicity}`}</Text>
                    <Divider my="2" />
                    <Text fontSize="16" fontWeight="medium">
                        Mô tả sản phẩm:
                    </Text>
                    <Text mt="1" color="gray.700">{`Sản lượng: ${product?.description}`}</Text>
                </ScrollView>
            </View>

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
                <QuantityInput
                    value={quantity}
                    setValue={setQuantity}
                    min={product?.minPurchase || 0}
                    max={product?.quantity || 100}
                />
                <Button>Thêm vào giỏ hàng</Button>
            </HStack>
        </View>
    );
}

export default DetailProductScreen;
