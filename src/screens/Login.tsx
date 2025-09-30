import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, Pressable} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, senha);
        } catch (error) {
            setErro("Erro ao entrar: " + error);
        }
    };

    return (
        <View style={styles.container}>
            <Image style={{ width: 200, height: 200 }} source={require("../../assets/necologin.webp")}></Image>
            <Text style={styles.title}>Login</Text>
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
                secureTextEntry //não mostra o que foi digitado
                style={styles.input}
            />
            {erro ? <Text style={styles.error}>{erro}</Text> : null}
            <Pressable style={{borderRadius: 10, padding: 4, marginBottom: 250, justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'lightgreen'
                               }} onPress={login}><Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Entrar</Text></Pressable>
            <Pressable style={{width: 200, borderRadius: 10, padding: 4, marginBottom: 100, justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'lightgreen'
                               }} onPress={() => navigation.navigate("Cadastro")}><Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>CADASTRE-SE</Text></Pressable>

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