import { Box, Button, Center, Flex, HStack, Image, Pressable, ScrollView, Text } from 'native-base';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import API from '../../constants/Api';
import ProductCard from '../../components/ProductCard';
import { useIsFocused } from '@react-navigation/native';
import NAVIGATION_KEY from '../../constants/NavigationKey';

function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            fetchCategories();
            fetchProducts();
        }
    }, [isFocused]);

    async function fetchCategories() {
        try {
            const res = await fetch(`${API}/categories`);
            const data = await res.json();
            if (data.error) {
                console.log(data.error);
                return;
            }
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    }

    async function fetchProducts() {
        try {
            const res = await fetch(`${API}/products`);
            const data = await res.json();
            if (data.error) {
                console.log(data.error);
                return;
            }
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <ScrollView flex="1">
            {/* Cateogries */}
            <Box mt="3" px="3">
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <HStack space="3">
                        {categories.map((category) => (
                            <Pressable
                                key={category._id}
                                onPress={() => navigation.navigate(NAVIGATION_KEY.ProductList, { category })}
                            >
                                <Center w="24" py="2" bg="white" rounded="md">
                                    <Image src={category.icon} w="16" h="16" rounded="full" alt="" />
                                    <Text mt="1" fontSize={12}>
                                        {category.name}
                                    </Text>
                                </Center>
                            </Pressable>
                        ))}
                    </HStack>
                </ScrollView>
            </Box>

            <Box px="1.5" mt="5">
                <HStack px="1.5" justifyContent="space-between" alignItems="center">
                    <Text fontSize={20} bold>
                        Mới nhất
                    </Text>
                    <Pressable>
                        <Text underline bold color="primary.600">
                            Xem thêm
                        </Text>
                    </Pressable>
                </HStack>
                <HStack flexWrap="wrap" w="full">
                    {[...products]
                        .reverse()
                        .slice(0, 4)
                        .map((product) => (
                            <Box key={product._id} w="50%" p="1.5">
                                <ProductCard product={product} />
                            </Box>
                        ))}
                </HStack>
            </Box>
            {categories?.map((category) => (
                <Box px="1.5" mt="5" key={category._id}>
                    <HStack px="1.5" justifyContent="space-between" alignItems="center">
                        <Text fontSize={20} bold>
                            {category.name}
                        </Text>
                        <Pressable>
                            <Text underline bold color="primary.600">
                                Xem thêm
                            </Text>
                        </Pressable>
                    </HStack>
                    <HStack flexWrap="wrap" w="full">
                        {[...products]
                            .filter((product) => product.category._id === category._id)
                            .reverse()
                            .slice(0, 4)
                            .map((product) => (
                                <Box key={product._id} w="50%" p="1.5">
                                    <ProductCard product={product} />
                                </Box>
                            ))}
                    </HStack>
                </Box>
            ))}
        </ScrollView>
    );
}

export default HomeScreen;
