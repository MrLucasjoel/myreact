import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Header from "../components/Header";
import globalStyles from "../styles/global";
import typography from "../styles/typography";
import colors from "../styles/colors";

export default function HomeScreen({ navigation }) {
  const handleLogout = () => {
    navigation.replace("Login");
  };

  return (
    <View style={globalStyles.container}>
      <Header title="Home" />

      <Text style={typography.title}>Bem-vindo à Home!</Text>

      {/* Menu de Opções */}
      <View style={styles.menu}>
        <Pressable style={styles.card} onPress={() => alert("Abrir Perfil")}>
          <Text style={styles.cardText}>👤 Perfil</Text>
        </Pressable>

        <Pressable style={styles.card} onPress={() => alert("Abrir Configurações")}>
          <Text style={styles.cardText}>⚙️ Configurações</Text>
        </Pressable>

        <Pressable style={styles.card} onPress={() => alert("Abrir Sobre")}>
          <Text style={styles.cardText}>ℹ️ Sobre</Text>
        </Pressable>

        <Pressable style={[styles.card, styles.logout]} onPress={handleLogout}>
          <Text style={styles.cardText}>🚪 Sair</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    elevation: 3, // sombra Android
    shadowColor: "#000", // sombra iOS
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
    backgroundColor: "#e53935", // vermelho para sair
  },
});
