// App.js
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens();
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

// ----------------- CONFIG -----------------
const API_URL = "http://10.0.2.2:3000";
// emulador Android use 10.0.2.2
// celular físico use IP da sua máquina

const colors = {
  primary: '#0D07A8',
  secondary: '#FF9500',
  background: '#F2F2F7',
  text: '#1C1C1E',
  white: '#FFFFFF',
  danger: '#FF3B30',
};

const globalStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, padding: 20 },
});

const typography = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 12 },
  text: { fontSize: 16, color: colors.text },
});

// ----------------- HEADER -----------------
function Header({ title }) {
  return (
    <View style={headerStyles.header}>
      <Text style={headerStyles.headerText}>{title}</Text>
    </View>
  );
}
const headerStyles = StyleSheet.create({
  header: {
    padding: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 12,
  },
  headerText: { fontSize: 18, fontWeight: 'bold', color: colors.white },
});

// ----------------- TELAS -----------------

// Login
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const isFormValid = email.trim() !== '' && senha.trim() !== '';

  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView contentContainerStyle={globalStyles.container}>
        <Header title="Login" />
        <Image
          source={require('./assets/logo.jpg')}
          style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 20 }}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={authStyles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          style={authStyles.input}
          secureTextEntry
        />
        <Pressable
          style={[authStyles.button, !isFormValid && authStyles.buttonDisabled]}
          onPress={() => {
            if (!isFormValid) return Alert.alert('Preencha e-mail e senha');
            navigation.replace('Home');
          }}
        >
          <Text style={authStyles.buttonText}>Entrar</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Registrar')}>
          <Text style={authStyles.link}>Criar conta</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Redefinir Senha')}>
          <Text style={authStyles.link}>Esqueceu a senha?</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

// Registrar
function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const isValid = nome.trim() && email.trim() && senha.trim();

  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView contentContainerStyle={globalStyles.container}>
        <Header title="Registrar" />
        <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={authStyles.input} />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={authStyles.input} />
        <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} style={authStyles.input} secureTextEntry />
        <Pressable
          style={[authStyles.button, !isValid && authStyles.buttonDisabled]}
          onPress={() => {
            if (!isValid) return Alert.alert('Preencha todos os campos');
            navigation.replace('Home');
          }}
        >
          <Text style={authStyles.buttonText}>Registrar</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

// Redefinir Senha
function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView contentContainerStyle={globalStyles.container}>
        <Header title="Redefinir Senha" />
        <TextInput placeholder="Digite seu email" value={email} onChangeText={setEmail} style={authStyles.input} />
        <Pressable
          style={authStyles.button}
          onPress={() => {
            if (!email.trim()) return Alert.alert('Informe o e-mail');
            Alert.alert('Link enviado', 'Verifique seu e-mail');
            navigation.replace('Login');
          }}
        >
          <Text style={authStyles.buttonText}>Enviar link</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

// Home
function HomeScreen({ navigation }) {
  const handleLogout = () => navigation.replace('Login');

  return (
    <SafeAreaView style={globalStyles.screen}>
      <View style={globalStyles.container}>
        <Header title="Home" />
        <Text style={typography.title}>Bem-vindo à Home!</Text>

        <View style={homeStyles.menu}>
          <Pressable
            style={homeStyles.card}
            onPress={() =>
              navigation.navigate('Perfil', {
                nome: 'Lucas Joel',
                avatar:
                  'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg',
              })
            }
          >
            <Text style={homeStyles.cardText}>👤 Perfil</Text>
          </Pressable>

          <Pressable style={homeStyles.card} onPress={() => navigation.navigate('Loja')}>
            <MaterialIcons name="store" size={24} color="black" />
            <Text style={homeStyles.cardText}>Loja</Text>
          </Pressable>

          <Pressable style={homeStyles.card} onPress={() => Alert.alert('Configurações')}>
            <Text style={homeStyles.cardText}>⚙️ Configurações</Text>
          </Pressable>

          <Pressable style={homeStyles.card} onPress={() => navigation.navigate('Sobre')}>
            <Text style={homeStyles.cardText}>ℹ️ Sobre</Text>
          </Pressable>

          <Pressable style={[homeStyles.card, homeStyles.logout]} onPress={handleLogout}>
            <Text style={homeStyles.cardText}>🚪 Sair</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Sobre
function Sobre() {
  return (
    <SafeAreaView style={globalStyles.screen}>
      <View style={globalStyles.container}>
        <Header title="Sobre" />
        <Text style={typography.text}>
          Este é um app exemplo criado com React Native + Navigation.
        </Text>
      </View>
    </SafeAreaView>
  );
}

// Perfil
function ProfileScreen({ route }) {
  const params = route?.params ?? {};
  const nome = params.nome ?? 'Lucas Joel';
  const avatar = params.avatar ?? null;

  return (
    <SafeAreaView style={globalStyles.screen}>
      <View style={profileStyles.container}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={profileStyles.profileImage} />
        ) : (
          <View style={[profileStyles.profileImage, { backgroundColor: '#ccc' }]} />
        )}
        <Text style={profileStyles.name}>{nome}</Text>
      </View>
    </SafeAreaView>
  );
}

// Loja (conectada ao MySQL via API)
function LojaScreen() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [itens, setItens] = useState([]);

  const carregarItens = async () => {
    try {
      const res = await axios.get(`${API_URL}/itens`);
      setItens(res.data);
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível carregar itens");
    }
  };

  const adicionarItem = async () => {
    if (!nome || !preco) {
      Alert.alert("Aviso", "Preencha nome e preço");
      return;
    }
    try {
      await axios.post(`${API_URL}/itens`, { nome, preco });
      setNome('');
      setPreco('');
      carregarItens();
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível adicionar item");
    }
  };

  const confirmarCompra = async () => {
    try {
      await axios.post(`${API_URL}/confirmar`);
      carregarItens();
      Alert.alert("Sucesso", "Compra confirmada!");
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível confirmar a compra");
    }
  };

  useEffect(() => {
    carregarItens();
  }, []);

  return (
    <SafeAreaView style={globalStyles.screen}>
      <View style={globalStyles.container}>
        <Header title="Loja" />

        <TextInput
          style={authStyles.input}
          placeholder="Nome do item"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={authStyles.input}
          placeholder="Preço"
          value={preco}
          onChangeText={setPreco}
          keyboardType="numeric"
        />
        <Pressable style={authStyles.button} onPress={adicionarItem}>
          <Text style={authStyles.buttonText}>Adicionar</Text>
        </Pressable>

        <FlatList
          data={itens}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={{ padding: 8 }}>
              {item.nome} - R$ {item.preco}
            </Text>
          )}
        />

        {itens.length > 0 && (
          <Pressable style={[authStyles.button, { backgroundColor: 'green' }]} onPress={confirmarCompra}>
            <Text style={authStyles.buttonText}>Confirmar Compra</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

// ----------------- STYLES -----------------
const authStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: colors.white,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: { color: colors.white, fontSize: 16, fontWeight: 'bold' },
  buttonDisabled: { opacity: 0.6 },
  link: { color: colors.primary, textAlign: 'center', marginTop: 10 },
});

const homeStyles = StyleSheet.create({
  menu: { marginTop: 10 },
  card: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardText: { fontSize: 16, color: colors.text },
  logout: { backgroundColor: colors.danger },
});

const profileStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  profileImage: { width: 150, height: 150, borderRadius: 75, marginBottom: 16 },
  name: { fontSize: 22, fontWeight: 'bold', color: colors.text },
});

// ----------------- NAV -----------------
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registrar" component={RegisterScreen} />
          <Stack.Screen name="Redefinir Senha" component={ResetPasswordScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Sobre" component={Sobre} />
          <Stack.Screen name="Perfil" component={ProfileScreen} />
          <Stack.Screen name="Loja" component={LojaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
