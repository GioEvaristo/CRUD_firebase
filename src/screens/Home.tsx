import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Pressable, FlatList, Image, Button } from "react-native";
import { db, auth } from '../../firebaseConfig';
import { signOut } from "firebase/auth";

export default function App() {
    const [mensagens, setMensagens] = useState<any[]>([]);
    const [novoTexto, setNovoTexto] = useState("");

    // Leitura em tempo real
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "mensagens"), (snapshot) => {
            const lista: any[] = [];
            snapshot.forEach((doc) => {
                lista.push({ id: doc.id, ...doc.data() });
            });
            setMensagens(lista);
        });
        return () => unsubscribe();
    }, []);

    // Criar mensagem
    const adicionarMensagem = async () => {
        if (novoTexto.trim() === "") return;
        await addDoc(collection(db, "mensagens"), {
            texto: novoTexto,
            data: new Date().toISOString(),
        });
        setNovoTexto("");
    };

    // Atualizar mensagem
    const atualizarMensagem = async (id: string) => {
        const docRef = doc(db, "mensagens", id);
        await updateDoc(docRef, { texto: "Atualizado!" });
    };

    // Deletar mensagem
    const deletarMensagem = async (id: string) => {
        const docRef = doc(db, "mensagens", id);
        await deleteDoc(docRef);
    };

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: "lightpink"  }}>
            <Image style={{ width: 350, height: 190 }} source={require("../../assets/necohome.gif")}></Image>
            <Text style={{ flex: 0, fontSize: 30, fontWeight: "bold", marginBottom: 20, color: "white" }}>
                ..::Tarefas::..
            </Text>
            <TextInput
                placeholder='Digite a tarefa...'
                value={novoTexto}
                onChangeText={setNovoTexto}
                style={{
                    borderWidth: 1,
                    padding: 5,
                    marginBottom: 10,
                    borderRadius: 5,
                }}
            />
            <Pressable style={{width:200,borderRadius: 10, padding: 4, marginBottom: 30, justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'lightgreen'
        }} onPress={adicionarMensagem}><Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Adicionar Tarefa</Text></Pressable>
            <FlatList
                data={mensagens}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View
                        style={{
                            padding: 10,
                            borderBottomWidth: 3,
                            borderColor: "lightgreen",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Text>{item.texto}</Text>
                        <Pressable onPress={() => atualizarMensagem(item.id)}><Image style={{ width: 30, height: 30 }} source={require('../../assets/botao-editar.png')} /></Pressable>
                        <Pressable onPress={() => deletarMensagem(item.id)}><Image style={{ width: 30, height: 30 }} source={require('../../assets/remover-arquivo.png')} /></Pressable>
                    </View>
                )}
            />
            <Pressable style={{width: 100, borderRadius: 10, padding: 4, marginBottom: 30, justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'lightgreen'
        }} onPress={() => signOut(auth)}><Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>SAIR</Text></Pressable>
        </View>
    )
}
