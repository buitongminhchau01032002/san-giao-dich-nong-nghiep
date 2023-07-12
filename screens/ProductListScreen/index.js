import { Box, HStack, Heading, Input, ScrollView, Text, VStack, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import ProductListGrid from '../../components/ProductListGrid';
import ProductSearchBar from './ProductSearchBar';
import ProductCard from '../../components/ProductCard';
import { useIsFocused } from '@react-navigation/native';
import API from '../../constants/Api';
import { Ionicons } from '@expo/vector-icons';

function stringToSlug(str) {
    if (!str) return '';
    // remove accents
    var from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
        to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], 'gi'), to[i]);
    }

    str = str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\-]/g, '-')
        .replace(/-+/g, '-');

    return str;
}

function ProductListScreen({ route, navigation }) {
    const { category } = route.params;
    const [products, setProducts] = useState([]);
    const [searchProducts, setSearchProducts] = useState([]);
    const [search, setSearch] = useState('');
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            fetchProducts();
        }
    }, [isFocused]);

    useEffect(() => {
        navigation.setOptions({
            title: category.name,
        });
    }, [category]);

    useEffect(() => {
        if (!search) {
            setSearchProducts(products);
            return;
        }
        const newSearchProducts = products.filter((product) =>
            stringToSlug(product.name).includes(stringToSlug(search)),
        );
        setSearchProducts(newSearchProducts);
    }, [products, search]);

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
        <VStack flex={1}>
            <Box p="3">
                <Input
                    placeholder="Tìm sản phẩm"
                    InputLeftElement={
                        <Ionicons name="search-outline" size={24} style={{ paddingLeft: 8 }} color="#444" />
                    }
                    value={search}
                    onChangeText={setSearch}
                />
            </Box>
            <ScrollView flex={1}>
                <Box px="1.5" key={category._id}>
                    <HStack flexWrap="wrap" w="full">
                        {[...searchProducts]
                            .filter((product) => product.category._id === category._id)
                            .reverse()
                            .map((product) => (
                                <Box key={product._id} w="50%" p="1.5">
                                    <ProductCard product={product} />
                                </Box>
                            ))}
                    </HStack>
                </Box>
            </ScrollView>
        </VStack>
    );
}

export default ProductListScreen;
