import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, FlatList, Image, Pressable } from "react-native";
import { db } from "./firebaseConfig";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

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
    <View style={{ flex: 1, padding: 20, backgroundColor: "lightpink" }}>
      <Image style={{ width: 300, height: 300 }} source={require("./assets/necoarc.webp")}></Image>
      <Text style={{ flex: 0, fontSize: 30, fontWeight: "bold", marginBottom: 20, color: "white"}}>
        ..::Tarefas::..
      </Text>
      <TextInput
        placeholder="Digite uma tarefa"
        value={novoTexto}
        onChangeText={setNovoTexto}
        style={{
          backgroundColor: "white",
          borderWidth: 2,
          borderColor: "lightgreen",
          padding: 8,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />
      <Button title="Adicionar" onPress={adicionarMensagem} />
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
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable onPress={() => atualizarMensagem(item.id)}><Image style={{ width: 30, height: 30 }} source={require('./assets/botao-editar.png')} /></Pressable>
              <Pressable onPress={() => deletarMensagem(item.id)}><Image style={{ width: 30, height: 30 }} source={require('./assets/remover-arquivo.png')} /></Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );

}
