import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Validação simples para habilitar o botão
  const isFormValid = email.trim() !== "" && senha.trim() !== "";

  const handleLogin = () => {
    Alert.alert("Login realizado com sucesso!");
  };

  const handleRegister = () => {
    Alert.alert("Tela de Registro em breve!");
  };

  const handleResetPassword = () => {
    Alert.alert("Tela de redefinição de senha em breve!");
  };

  return (
    <View style={styles.container}>
      {/* Imagem/logo */}
      <Image
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        style={styles.logo}
      />

      {/* Campo de E-mail */}
      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo de Senha */}
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {/* Botão Entrar */}
      <View style={styles.button}>
        <Button
          title="ENTRAR"
          onPress={handleLogin}
          disabled={!isFormValid}
          color="#4CAF50"
        />
      </View>

      {/* Links */}
      <Pressable onPress={handleRegister}>
        <Text style={styles.link}>Registrar-se</Text>
      </Pressable>

      <Pressable onPress={handleResetPassword}>
        <Text style={styles.link}>Redefinir a Senha</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    marginVertical: 15,
  },
  link: {
    color: "#1E90FF",
    marginTop: 10,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
