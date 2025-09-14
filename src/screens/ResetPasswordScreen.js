import React, { useRef, useState } from "react";
import { View, Alert } from "react-native";
import Header from "../components/Header";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryButton from "../components/PrimaryButton";
import globalStyles from "../styles/global";

export default function ResetPasswordScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordRef = useRef(null);

  // Função para validar força da senha
  const validatePasswordStrength = (pwd) => {
    const minLength = /.{6,}/; // mínimo 6 caracteres
    const hasUpper = /[A-Z]/; // ao menos uma maiúscula
    const hasNumber = /\d/;   // ao menos um número

    if (!minLength.test(pwd)) {
      return "A senha deve ter pelo menos 6 caracteres";
    }
    if (!hasUpper.test(pwd)) {
      return "A senha deve conter pelo menos uma letra maiúscula";
    }
    if (!hasNumber.test(pwd)) {
      return "A senha deve conter pelo menos um número";
    }
    return null;
  };

  const handleReset = () => {
    if (password.trim() === "" || confirmPassword.trim() === "") {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    // Validação de força
    const error = validatePasswordStrength(password);
    if (error) {
      Alert.alert("Erro", error);
      passwordRef.current?.focus();
      return;
    }

    // Validação de igualdade
    if (password !== confirmPassword) {
      Alert.alert("Erro", "Senhas não são iguais");
      passwordRef.current?.focus();
      return;
    }

    // Se passou por tudo:
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
        ref={passwordRef}
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
