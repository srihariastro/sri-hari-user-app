import { View, Text, FlatList, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Sizes, Fonts } from '../../assets/style'
import { SCREEN_WIDTH } from '../../config/Screen'
import LinearGradient from 'react-native-linear-gradient'
import { getFontSize } from '../../config/Constants1'
import MyStatusBar from '../../components/MyStatusbar'
import { connect } from 'react-redux'
import { img_url } from '../../config/constants'

const Spell = ({ dispatch, navigation, astromallSpellData }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteDark }}>
            <MyStatusBar backgroundColor={Colors.primaryDark} barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                {/* <FlatList ListHeaderComponent={<>
                    {astromallSpellData && categoriesInfo()}
                </>}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2 }}
                /> */}
            </View>
        </View>
    )

    function categoriesInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate('registeredPooja', { ...item })} activeOpacity={0.8} style={styles.itemContainer}>
                    <ImageBackground
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: img_url + item?.image }}
                    >
                        <LinearGradient
                            style={{ width: '100%', height: '100%', justifyContent: 'flex-end', padding: Sizes.fixPadding }}
                            colors={['rgba(0, 0, 0, 0.18)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
                        >
                            <Text style={{ ...Fonts.white11InterMedium, fontSize: getFontSize(2), textAlign: 'center' }}>{item?.poojaName}</Text>
                        </LinearGradient>
                    </ImageBackground>
                </TouchableOpacity>
            )
        }
        return (
            <FlatList data={astromallSpellData} numColumns={2} renderItem={renderItem} />
        )
    }
}

const mapStateToProps = state => ({
    astromallSpellData: state.astromall.astromallSpellData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Spell)

const styles = StyleSheet.create({
    itemContainer: {
        width: SCREEN_WIDTH * 0.4,
        height: SCREEN_WIDTH * 0.6,
        borderRadius: Sizes.fixPadding,
        overflow: 'hidden',
        marginBottom: Sizes.fixPadding * 2,
        marginLeft: SCREEN_WIDTH * 0.065,
        elevation: 5
    }
})