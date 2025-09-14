import React, { useState } from "react";
import { View, Alert, Pressable, Text } from "react-native";
import Header from "../components/Header";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryButton from "../components/PrimaryButton";
import globalStyles from "../styles/global";
import typography from "../styles/typography";

export default function RegisterScreen({ navigation }) {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const isFormValid =
    cpf.trim() !== "" && nome.trim() !== "" && email.trim() !== "" && senha.trim() !== "";

  const handleRegister = () => {
    Alert.alert("Usuário registrado com sucesso!");
    navigation.navigate("Login");
  };

  return (
    <View style={globalStyles.container}>
      <Header title="Cadastro de Usuário" />

      <PrimaryInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />

      <PrimaryInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <PrimaryInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <PrimaryInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <PrimaryButton
        title="Salvar"
        onPress={handleRegister}
        disabled={!isFormValid}
      />

      {/* Link para voltar ao Login */}
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={typography.link}>Voltar para o Login</Text>
      </Pressable>
    </View>
  );
}
