import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../redux/actions";
import { __AddDeck } from "../utils/api";
import * as helper from "../utils/helper";
import { purple, white,green } from "../utils/color";

class AddDecks extends Component {

    state = {
        title: '',
        disableButton: true,
    }

    toViewDeck = (key) => {
        this.props.navigation.navigate("DisplayDeck", { deckId: key })
    }

    handleTitle = (title) => {
        this.setState({ title, disableButton: title ? false : true })
    }

    handleCreateDeck = () => {
        const { title } = this.state
        const { dispatch } = this.props

        const deckKeys = helper.generateKey()
        const newDeck = {
            title: title,
            questions: []
        }
        dispatch(addDeck(newDeck, deckKeys))
        __AddDeck(newDeck, deckKeys)
        this.toViewDeck(deckKeys)
        this.setState(() => ({
            title: ''
        }))
    }

    render() {
        const { title, disableButton } = this.state

        return <View style = { styles.container } >
            <TextInput
        style = { styles.inputField }
        placeholder = "Title"
        value = { title }
        onChangeText = { this.handleTitle }
        />

        <TouchableOpacity
        style = { styles.button }
        onPress = { this.handleCreateDeck }
        disabled = { disableButton } >
            <Text style = {
                { color: white }
            } > Create new Deck </Text> 
            </TouchableOpacity> 
            </View>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    inputField: {
        height: 45,
        marginVertical: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: green,
        borderRadius: 2,
    },
    button: {
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: green,
        borderRadius: 5,
        height: 40
    }
});

export default connect()(AddDecks)