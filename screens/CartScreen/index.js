import {
    Box,
    Button,
    Center,
    Text,
    ScrollView,
    View,
    HStack,
    VStack,
    Flex,
    Image,
    IconButton,
    Toast,
} from 'native-base';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import API from '../../constants/Api';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/userSelector';
import UpAndDownItem from '../../components/UpAndDownItem';
import { EvilIcons } from '@expo/vector-icons';

function CartScreen() {
    const [cart, setCart] = useState(null);
    const user = useSelector(userSelector);

    useEffect(() => {
        fetchCart();
    }, []);

    const totalPrice = cart?.details?.reduce((prev, curr) => prev + curr?.product?.price, 0);

    async function fetchCart() {
        try {
            const res = await fetch(`${API}/carts/current`, {
                headers: {
                    Authorization: 'Bearer ' + user?.token,
                },
            });
            const data = await res.json();
            if (data.error) {
                console.log(data.error);
                return;
            }
            setCart(data);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleDeleteCartItem(id) {
        try {
            const res = await fetch(`${API}/carts/remove-product/${id}`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + user?.token,
                },
            });
            const data = await res.json();
            if (data.error) {
                console.log(data.error);
                return;
            }
            fetchCart();
        } catch (err) {
            console.log(err);
        }
    }

    async function checkoutCart() {
        try {
            const res = await fetch(`${API}/carts/checkout`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + user?.token,
                },
            });
            const data = await res.json();
            if (data.error) {
                console.log(data.error);
                Toast.show({ description: data.error.message });
                return;
            }
            fetchCart();
            Toast.show({ description: 'Thanh toán thành công' });
        } catch (err) {
            console.log(err);
            Toast.show({ description: 'Có lỗi xảy ra!' });
        }
    }

    return (
        <VStack flex={1} mt={2}>
            <View flex={1}>
                <ScrollView>
                    {cart?.details?.map((cartItem) => (
                        <HStack
                            key={cartItem._id}
                            space={3}
                            rounded={8}
                            mt="3"
                            bg="white"
                            mx="3"
                            overflow="hidden"
                            p="3"
                            pr="0"
                        >
                            <Image
                                rounded={4}
                                bg="gray.200"
                                src={cartItem?.product?.image}
                                alt=""
                                w="20"
                                h={20}
                                resizeMode="cover"
                            />

                            <VStack flex={1}>
                                <Text fontSize="14" fontWeight="600" isTruncated w="full" color="#000000">
                                    {cartItem?.product?.name}
                                </Text>

                                <Text flexBasis={75} fontSize="16" color="primary.600" fontWeight={700} isTruncated>
                                    {cartItem?.product?.price}đ
                                </Text>
                                <Text>Số lượng: {cartItem?.quantity}</Text>
                            </VStack>

                            <IconButton
                                onPress={() => handleDeleteCartItem(cartItem._id)}
                                icon={<EvilIcons name="trash" size={32} color="#c00" />}
                            />
                        </HStack>
                    ))}
                </ScrollView>
            </View>

            <HStack justifyContent="space-between" p="3">
                <VStack>
                    <Text fontSize="18" fontWeight={700} color="primary.600">
                        {totalPrice}
                    </Text>
                    <Text fontSize={12} fontWeight={300}>
                        Số lượng: {cart?.details?.length}
                    </Text>
                </VStack>

                <Box ml={4} mr={2} pt={1}>
                    <Button onPress={checkoutCart}>Thanh toán</Button>
                </Box>
            </HStack>
        </VStack>
    );
}
export default CartScreen;
