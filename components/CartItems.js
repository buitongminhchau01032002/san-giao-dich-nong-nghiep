import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Box, Center, HStack, Pressable, Image, VStack, Flex, Text } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { FontAwesome } from '@expo/vector-icons';
import products from '../data/Products';
import { Ionicons } from '@expo/vector-icons';
import UpAndDownItem from './UpAndDownItem';
import CustomRadioButton from './CustomRadioButton';
export default function CartItems() {
    const Swiper = () => (
        <SwipeListView
            rightOpenValue={-50}
            previewRowKey="0"
            previewOpenValue={-40}
            previewOpenDelay={3000}
            data={products}
            renderItem={renderitem}
            renderHiddenItem={hiddenItems}
            showsVerticalScrollIndicator={false}
        />
    );

    const renderitem = (data) => (
        <Pressable>
            <Box ml={2} mb={5} borderRadius={1}>
                <HStack alignItems="center" bg="#FFFFFF" rounded={5} overflow="hidden">
                    <Box pl={2} pr={4}>
                        <CustomRadioButton></CustomRadioButton>
                    </Box>

                    <Center w="25%" bg="#E1F0D7">
                        <Image
                            source={{ uri: data.item.image }}
                            alt={data.item.name}
                            w="full"
                            h={20}
                            resizeMode="cover"
                        ></Image>
                    </Center>
                    <VStack w="60%" pl={4}>
                        <Text fontSize="14" fontWeight="600" isTruncated w="full" color="#000000">
                            {data.item.name}
                        </Text>

                        <Flex flex={1} flexWrap="wrap" direction="row" justifyContent="flex-start" mt={1} px={0}>
                            <View flexBasis={30}>
                                <CustomRadioButton></CustomRadioButton>
                            </View>
                            <Text
                                style={styles.alignCenter}
                                flexBasis={135}
                                fontSize="13"
                                color="#000000"
                                isTruncated
                                w="full"
                            >
                                {data.item.providerName}
                            </Text>
                        </Flex>

                        <Flex flex={1} flexWrap="wrap" direction="row" justifyContent="flex-start" pr={1}>
                            <Text flexBasis={75} fontSize="13" color={'#e62831'} fontWeight={700} isTruncated w="full">
                                {data.item.price}đ
                            </Text>
                            <UpAndDownItem quantity={1}></UpAndDownItem>
                        </Flex>
                    </VStack>
                </HStack>
            </Box>
        </Pressable>
    );

    const hiddenItems = () => (
        <Pressable
            w={50}
            roundedTopRight={5}
            roundedBottomRight={5}
            h={20}
            ml="auto"
            justifyContent="center"
            bg="#FFFFFF"
        >
            <Center alignItems="center" space={2}>
                <FontAwesome name="trash" size={18} color="#000000"></FontAwesome>
            </Center>
        </Pressable>
    );
    const styles = StyleSheet.create({
        alignCenter: {
            alignSelf: 'center',
        },
    });
    return (
        <Box mr={6}>
            <Swiper />
        </Box>
    );
}
