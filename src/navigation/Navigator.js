import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import LoginScreen from "../screens/Login";
import CadastroScreen from "../screens/Cadastro";
import HomeScreen from "../screens/Home";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {usuario ? (
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} usuario={usuario} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}