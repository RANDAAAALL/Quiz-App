import { StyleSheet } from "react-native";

const RegisterStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: '100%',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    keyBoardAvoid: {
        flex: 1
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        // color: 'white',
        marginBottom: 10,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        // color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 30,
        textAlign: 'center'
    },
    label: {
        // color: 'white',
        marginBottom: 10,
        fontSize: 14,
        fontWeight: '500',
    },
    formContainer: {
        width: '100%',
        maxWidth: 350
    },
    inputs: {
        // backgroundColor: 'rgba(255, 255, 255, 0.15)',
        // color: 'white',
        // borderColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        padding: 20,
        borderWidth: 2,
    },
    inputContainer: {
        marginBottom: 20,
    },
    placeHolderColor: {
        // color: 'rgba(255, 255, 255, 0.5)',
    },
    passwordContainer: {
        // backgroundColor: 'rgba(255, 255, 255, 0.15)',
        // borderColor: 'rgba(255, 255, 255, 0.3)',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
    },
    passwordInput: {
        // color: 'white',
        flex: 1,
        padding: 20,
    },
    eyeIconContainer: {
        padding: 15,
    },
    eyeIconSpecs: {
        // color: 'rgba(255, 255, 255, 0.7)'
    },
    registerButton: {
        // backgroundColor: 'rgba(255, 255, 255, 0.25)',
        // borderColor: 'rgba(255, 255, 255, 0.4)',   
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 2,
    },      
    registerButtonText: {
        // color: 'black',
        fontSize: 17,
        fontWeight: '600',
    },
    errorTextTitle: {
        color: "red",
        marginTop: 4,
        marginLeft: 5
    },
    LoginTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    LoginTextTitle: {
        // color: 'rgba(255, 255, 255, 0.8)',
        marginRight: 5,
    },
    LoginRouteText: {
        // color: 'white',
        fontWeight: 'bold',
    },
    
})

export {RegisterStyles};