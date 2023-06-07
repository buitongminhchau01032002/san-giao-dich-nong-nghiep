import { Button, Center, Divider, HStack, Image, Input, Menu, Pressable, ScrollView, Text, View } from 'native-base';
import QuantityInput from './components/QuantityInput';
import { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';

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
    comments: [
        {
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            name: 'Minh Châu',
            createdAt: '20/10/2023',
            content: 'Sản phẩm này rất chất lượng, mọi người nên thử',
        },
        {
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            name: 'Minh Châu',
            createdAt: '20/10/2023',
            content: 'Sản phẩm này rất chất lượng, mọi người nên thử. Sản phẩm này rất chất lượng, mọi người nên thử',
        },
    ],
};

function DetailProductScreen() {
    const [quantity, setQuantity] = useState();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        setProduct(PRODUCT);
        // TODO: call api
    }, []);
    function handleDeleteComment(idComment) {
        console.log('delete comment', idComment);
    }
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
                    {/* SELLER */}
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
                    {/* COMMENT */}
                    <Divider my="2" />
                    <Text fontSize="16" fontWeight="medium">
                        Bình luận:
                    </Text>
                    <Input mt="2" placeholder="Viết bình luận" />
                    <View mt="2">
                        {product?.comments?.map((comment, index) => (
                            <View py="3" key={index}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <HStack alignItems="center">
                                        <Image source={{ uri: comment?.avatar }} h="9" w="9" rounded="full" alt="" />
                                        <View pl="2">
                                            <Text fontSize="14" fontWeight="bold">
                                                {comment?.name}
                                            </Text>
                                            <Text fontSize="12" color="gray.700">
                                                {comment?.createdAt}
                                            </Text>
                                        </View>
                                    </HStack>
                                    <Menu
                                        trigger={(triggerProps) => {
                                            return (
                                                <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                                                    <Center p="2">
                                                        <Entypo name="dots-three-vertical" size={16} color="#444" />
                                                    </Center>
                                                </Pressable>
                                            );
                                        }}
                                    >
                                        <Menu.Item onPress={() => handleDeleteComment('id')}>Xoá bình luận</Menu.Item>
                                    </Menu>
                                </HStack>
                                <Text>{comment?.content}</Text>
                            </View>
                        ))}
                    </View>
                    {/* PADDING */}
                    <View h="2"></View>
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
