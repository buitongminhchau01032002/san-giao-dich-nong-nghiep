import { Box, Button, Center, Text, ScrollView, View, HStack, VStack, Flex } from 'native-base';
import React from 'react';
import CartItems from '../../components/CartItems';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableHighlight } from 'react-native';
import CustomRadioButton from '../../components/CustomRadioButton';
function CartScreen() {
    return (
        <Box flex={1} safeAreaTop bg="#FFFFFF" mt={2}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <CartItems />
            </ScrollView>
            <HStack pt={2} pb={5}>
                <Box alignCenter pl={6} pt={1} pr={2}>
                    <CustomRadioButton></CustomRadioButton>
                </Box>
                <Text alignCenter fontSize="16" fontWeight="500" mt={1} isTruncated color="#000000">
                    Tất cả
                </Text>
                <Flex flex={1} flexWrap="wrap" direction="row" justifyContent="flex-end">
                    <VStack>
                        <Text fontSize="16" color={'#e62831'} fontWeight={700} isTruncated>
                            200000đ
                        </Text>
                        <Text fontSize="10" color={'#323232'} fontWeight={300}>
                            Số lượng:1
                        </Text>
                    </VStack>

                    <Box ml={4} mr={2} pt={1}>
                        <TouchableHighlight>
                            <View bg="#FF0000" pt={1} pb={1} pl={2} pr={2} style={styles.button}>
                                <Text color="#FFFFFF" fontSize="15">
                                    Thanh toán
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </Box>
                </Flex>
            </HStack>
        </Box>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
    },
});
export default CartScreen;
