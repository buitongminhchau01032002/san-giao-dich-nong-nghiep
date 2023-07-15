import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Box, Center, HStack, Pressable, Image, VStack, Flex, Text } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { FontAwesome } from '@expo/vector-icons';
import products from '../data/Products';
import { Ionicons } from '@expo/vector-icons';
import UpAndDownItem from './UpAndDownItem';
import CustomRadioButton from './CustomRadioButton';
