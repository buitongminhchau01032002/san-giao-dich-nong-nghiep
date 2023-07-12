import { Button, Center, HStack, Image, ScrollView, Text } from 'native-base';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import API from '../../constants/Api';
import ProductCard from '../../components/ProductCard';

function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

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
            console.log(error);
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
            console.log(error);
        }
    }

    console.log(categories);
    console.log(products);

    return (
        <ScrollView flex="1" px="3">
            {/* Cateogries */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} mt="3">
                <HStack space="3">
                    {categories.map((category) => (
                        <Center key={category._id} w="24" py="2" bg="white" rounded="md">
                            <Image src={category.icon} w="16" h="16" rounded="full" alt="" />
                            <Text mt="1" fontSize={12}>
                                {category.name}
                            </Text>
                        </Center>
                    ))}
                </HStack>
            </ScrollView>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} mt="3">
                <HStack space="3">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </HStack>
            </ScrollView>
        </ScrollView>
    );
}

export default HomeScreen;
