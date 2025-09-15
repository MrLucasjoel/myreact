// App.js
import React, { useState, useRef } from "react";
import { View, Image, Pressable, Text, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "./src/styles/colors";
import globalStyles from "./src/styles/global";
import typography from "./src/styles/typography";

// COMPONENTES REUSÁVEIS (Header, PrimaryInput, PrimaryButton)

import { TextInput, StyleSheet, TouchableOpacity } from "react-native";

// Header Component
function Header({ title }) {
  return (
    <View style={headerStyles.header}>
      <Text style={headerStyles.title}>{title}</Text>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  header: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.white,
  },
});

// PrimaryInput Component
function PrimaryInput({ placeholder, value, onChangeText, secureTextEntry = false, keyboardType = "default", forwardedRef }) {
  return (
    <TextInput
      style={globalStyles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
      ref={forwardedRef}
    />
  );
}

// PrimaryButton Component
function PrimaryButton({ title, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={[buttonStyles.button, disabled && buttonStyles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={buttonStyles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const buttonStyles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  disabled: {
    backgroundColor: "#a5d6a7",
  },
});

// Telas

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const isFormValid = email.trim() !== "" && senha.trim() !== "";

  const handleLogin = () => {
    Alert.alert("Login realizado com sucesso!");
    navigation.replace("Home");
  };

  return (
    <View style={globalStyles.container}>
      <Header title="Bem-vindo" />

      <Image
        source={require("./assets/logo.jpg")} // ajuste o caminho conforme seu projeto
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

function RegisterScreen({ navigation }) {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const isFormValid = cpf.trim() !== "" && nome.trim() !== "" && email.trim() !== "" && senha.trim() !== "";

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

      <PrimaryButton title="Salvar" onPress={handleRegister} disabled={!isFormValid} />

      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={typography.link}>Voltar para o Login</Text>
      </Pressable>
    </View>
  );
}

function ResetPasswordScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordRef = useRef(null);

  const validatePasswordStrength = (pwd) => {
    const minLength = /.{6,}/;
    const hasUpper = /[A-Z]/;
    const hasNumber = /\d/;

    if (!minLength.test(pwd)) return "A senha deve ter pelo menos 6 caracteres";
    if (!hasUpper.test(pwd)) return "A senha deve conter pelo menos uma letra maiúscula";
    if (!hasNumber.test(pwd)) return "A senha deve conter pelo menos um número";
    return null;
  };

  const handleReset = () => {
    if (password.trim() === "" || confirmPassword.trim() === "") {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const error = validatePasswordStrength(password);
    if (error) {
      Alert.alert("Erro", error);
      passwordRef.current?.focus();
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "Senhas não são iguais");
      passwordRef.current?.focus();
      return;
    }

    Alert.alert("Sucesso", "Senha redefinida com sucesso", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Login"),
      },
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <Header title="Redefinir Senha" />

      <PrimaryInput
        forwardedRef={passwordRef}
        placeholder="Digite a nova senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <PrimaryInput
        placeholder="Confirme a nova senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <PrimaryButton
        title="Salvar"
        onPress={handleReset}
        disabled={password.trim() === "" || confirmPassword.trim() === ""}
      />
    </View>
  );
}

function HomeScreen({ navigation }) {
  const handleLogout = () => {
    navigation.replace("Login");
  };

  return (
    <View style={globalStyles.container}>
      <Header title="Home" />

      <Text style={typography.title}>Bem-vindo à Home!</Text>

      <View style={homeStyles.menu}>
        <Pressable style={homeStyles.card} onPress={() => alert("Abrir Perfil")}>
          <Text style={homeStyles.cardText}>👤 Perfil</Text>
        </Pressable>

        <Pressable style={homeStyles.card} onPress={() => alert("Abrir Configurações")}>
          <Text style={homeStyles.cardText}>⚙️ Configurações</Text>
        </Pressable>

        <Pressable style={homeStyles.card} onPress={() => alert("Abrir Sobre")}>
          <Text style={homeStyles.cardText}>ℹ️ Sobre</Text>
        </Pressable>

        <Pressable style={[homeStyles.card, homeStyles.logout]} onPress={handleLogout}>
          <Text style={homeStyles.cardText}>🚪 Sair</Text>
        </Pressable>
      </View>
    </View>
  );
}

const homeStyles = StyleSheet.create({
  menu: {
    marginTop: 20,
    width: "100%",
  },
  card: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },
  logout: {
    backgroundColor: "#e53935",
  },
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registrar" component={RegisterScreen} />
        <Stack.Screen name="Redefinir Senha" component={ResetPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
