import React, { useState } from "react";
import { View, Image, Pressable, Text, Alert } from "react-native";
import Header from "../components/Header";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryButton from "../components/PrimaryButton";
import globalStyles from "../styles/global";
import typography from "../styles/typography";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const isFormValid = email.trim() !== "" && senha.trim() !== "";

  const handleLogin = () => {
    Alert.alert("Login realizado com sucesso!");
    navigation.replace("Home"); //vai para Home e não deixa voltar pro login
  };

  return (
    <View style={globalStyles.container}>
      <Header title="Bem-vindo" />

      <Image
        source={require("../../assets/logo.jpg")}
        style={{ width: 100, height: 100, marginBottom: 30 }}
      />

      <PrimaryInput
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <PrimaryInput
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <PrimaryButton title="ENTRAR" onPress={handleLogin} disabled={!isFormValid} />

      <Pressable onPress={() => navigation.navigate("Registrar")}>
        <Text style={typography.link}>Registrar-se</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Redefinir Senha")}>
        <Text style={typography.link}>Redefinir a Senha</Text>
      </Pressable>
    </View>
  );
}
