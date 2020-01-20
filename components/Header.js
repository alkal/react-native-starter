import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Colors from '../constants/colors';

const styles = StyleSheet.create({
    header:{
        width:'100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent:'center'
    },
    headerTitle:{
        color:'#444',
        fontSize: 24
    }
});

const Header = props => {
    return(
    <View style={styles.header}>
        <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
    );
};

export default Header;
