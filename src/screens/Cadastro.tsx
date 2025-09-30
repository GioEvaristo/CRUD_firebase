import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, Pressable } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function CadastroScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const cadastrar = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, senha);
            navigation.navigate("Login");
        } catch (error) {
            setErro("Erro ao cadastrar: " + error);
        }
    };
    return (
        <View style={styles.container}>
            <Image style={{ width: 200, height: 200 }} source={require("../../assets/necocadastro.gif")}></Image>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={styles.input}
            />
            <TextInput
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                style={styles.input}
            />
            {erro ? <Text style={styles.error}>{erro}</Text> : null}
            <Pressable style={{
                borderRadius: 10, padding: 4, marginBottom: 250, justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'lightgreen'
            }} onPress={cadastrar}><Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Entrar</Text></Pressable>
            <Pressable style={{
                width: 150, borderRadius: 10, padding: 4, marginBottom: 100, justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'lightgreen'
            }} onPress={() => navigation.goBack()}><Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Voltar ao login</Text></Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "lightpink"
    },

    title: {
        flex: 0,
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 20,
        color: "white"
    },
    input: {
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "lightgreen",
        padding: 8,
        marginBottom: 10,
        borderRadius: 15,
    },
    error: {
        color: "red",
        marginBottom: 10
    },

});