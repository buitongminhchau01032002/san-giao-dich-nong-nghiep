import { Flex, Heading, Pressable, ScrollView, Text, Image, Box, View } from "native-base";
import React from "react";
import products from "../data/Products";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
function ProductListGrid()
{
    return(
        <ScrollView flex={1}>
            <Flex
            flexWrap="wrap"
            direction="row"
            justifyContent="space-between"
            px={2.5}
            >
                {
                    products.map((product)=>(
                        <Pressable
                        key={product._id}
                            w="48%"
                            // rounded={"md"}
                            // shadow={2}
                            style={styles.container}
                            borderRadius={10}
                            pt={1}
                            pl={1}
                            pr={1}
                            my={3}
                            pb={2}
                            backgroundColor= '#f5f5f5'
                            overflow={"hidden"}
                        >
                            <Image
                            style={styles.image}
                            borderRadius={8}
                            source={{uri:product.image}}
                            alt={product.name}
                            w="full"
                            resizeMode="cover"
                            />
                            <Box px={2} pt={1} >
                            <Text 
                                fontSize="13"
                                fontStyle="italic"
                                mt={1}
                                isTruncated w="full"
                                color={"#0f9f00"}
                                >
                                    {product.name}
                                </Text>

                                <Flex
                                flex={1}
                                flexWrap="wrap"
                                direction="row"
                                justifyContent="flex-start"
                                mt={1}
                                px={0}>
                                <Ionicons 
                                flexBasis={15}
                                style={styles.alignCenter} 
                                name="location-outline" 
                                size={15} 
                                color={"#40afaa"}/>
                                <Text 
                                style={styles.alignCenter} 
                                flexBasis={85}
                                fontSize="10"
                                color={"#40afaa"}
                                isTruncated w="full"
                                >
                                    {product.location}
                                </Text>
                                </Flex>

                                <Flex
                                flex={1}
                                flexWrap="wrap"
                                direction="row"
                                justifyContent="space-between"
                                mt={1}
                                px={0}>
                                <Text 
                                flexBasis={50}
                                fontSize="12"
                                color={"#e62831"}
                                fontWeight={700}
                                isTruncated w="full"
                                >
                                    {product.price}đ
                                </Text>
                                <Text 
                                flexBasis={50}
                                fontSize="10"
                                color={"#40afaa"}
                                isTruncated w="full"
                                >
                                    Tối thiểu: {product.minQuantity}
                                </Text>
                                </Flex>
                            </Box>
                            </Pressable>
                    )


                    )
                }
            </Flex>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    
    container:{
        shadowColor: 'black',
        shadowOffset: {
            width: -3,
            height: -3,
            
          },
        elevation: 10,
        shadowRadius:5,
       // backgroundColor : "#0000"
    },
    image:{
        aspectRatio:1,
    },
    locationIcon: {
        alignSelf:"center",
    },
    alignCenter:{
        alignSelf:"center",
    },
  });
export default ProductListGrid;