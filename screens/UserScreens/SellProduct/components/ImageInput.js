import { Box, Button, Center, HStack, IconButton, Image, Pressable } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ImageInput({ initValue = '', onChange, ...props }) {
    const [image, setImage] = useState(initValue);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            aspect: [3, 3],
            quality: 0.5,
        });

        // console.log(result);

        if (!result.canceled) {
            const base64 = `data:image/jpg;base64,${result.assets[0].base64}`;
            setImage(base64);
            onChange(base64);
        }
    };

    function handleResetImage() {
        setImage(initValue);
        onChange(initValue);
    }

    return (
        <Box position="relative" h="180" bg="gray.200" rounded={8} overflow="hidden" {...props}>
            <Pressable onPress={pickImage}>
                {image ? (
                    <Image alt="" src={image} h="full" w="full" />
                ) : (
                    <Center h="full" w="full">
                        <MaterialCommunityIcons name="file-image-plus-outline" size={40} color="black" />
                    </Center>
                )}
            </Pressable>

            {image && (
                <IconButton
                    position="absolute"
                    right="2"
                    top="2"
                    rounded="full"
                    bg="black:alpha.50"
                    py="3"
                    onPress={handleResetImage}
                    icon={<EvilIcons name="close" size={20} color="white" />}
                />
            )}
        </Box>
    );
}
