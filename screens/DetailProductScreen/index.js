import {
    Button,
    Center,
    Divider,
    HStack,
    Image,
    Input,
    Menu,
    Pressable,
    ScrollView,
    Text,
    Toast,
    View,
} from 'native-base';
import QuantityInput from './components/QuantityInput';
import { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import API from '../../constants/Api';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/userSelector';

function DetailProductScreen({ route, navigation }) {
    const { product } = route.params;
    const [quantity, setQuantity] = useState(product?.minPurchase);
    const user = useSelector(userSelector);
    const [loading, setLoading] = useState(false);

    function handleDeleteComment(idComment) {
        console.log('delete comment', idComment);
    }

    async function handleAddToCart() {
        try {
            setLoading(true);
            const res = await fetch(`${API}/carts/add-product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user?.token,
                },
                body: JSON.stringify({
                    product,
                    quantity,
                }),
            });
            const data = await res.json();
            if (data.error) {
                Toast.show({ description: data.error?.message });
                setLoading(false);
                return;
            }
            Toast.show({ description: 'Thêm vào giả hàng thành công!' });
        } catch (err) {
            console.log(err);
            Toast.show({ description: 'Có lỗi xảy ra!' });
        } finally {
            setLoading(false);
        }
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
                        bg="gray.300"
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
                <Button disabled={loading} onPress={handleAddToCart}>
                    Thêm vào giỏ hàng
                </Button>
            </HStack>
        </View>
    );
}

export default DetailProductScreen;
