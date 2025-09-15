import React, { useState, useEffect } from 'react';
import {StyleSheet,View,Text,TextInput,Button,FlatList,Modal,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@produtos_key';

export default function App() {
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);

  // Estados para o Modal centralizado
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  // UseEffect para carregar os produtos quando o componente é montado
  useEffect(() => {
    carregarProdutos();
  }, []);

  // --- Funções de Modal (para os alunos) ---
  // A propriedade 'visible={modalVisible}' do componente Modal é o que o torna visível ou invisível.
  // Ele sempre deve ser controlado por um estado.
  const showModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  // --- Funções de Persistência (AsyncStorage) ---

  const carregarProdutos = async () => {
    try {
      const produtosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
      if (produtosSalvos !== null) {
        setProdutos(JSON.parse(produtosSalvos));
        showModal('Sucesso', 'Lista de produtos carregada!');
      } else {
        setProdutos([]);
        showModal('Aviso', 'Nenhum produto cadastrado.');
      }
    } catch (e) {
      showModal('Erro', 'Não foi possível carregar os produtos.');
    }
  };

  const salvarProduto = async () => {
    if (!descricao || !quantidade || !valor) {
      showModal('Atenção', 'Por favor, preencha todos os campos!');
      return;
    }

    try {
      let listaAtualizada = [];
      if (produtoEmEdicao) {
        // Lógica para ALTERAR produto
        listaAtualizada = produtos.map(prod =>
          prod.id === produtoEmEdicao.id
            ? { ...prod, descricao, quantidade: parseInt(quantidade), valor: parseFloat(valor) }
            : prod
        );
        setProdutoEmEdicao(null);
        showModal('Sucesso', 'Produto atualizado com sucesso!');
      } else {
        // Lógica para SALVAR novo produto
        const novoProduto = {
          id: Date.now(),
          descricao,
          quantidade: parseInt(quantidade),
          valor: parseFloat(valor),
        };
        listaAtualizada = [...produtos, novoProduto];
        showModal('Sucesso', 'Produto cadastrado!');
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(listaAtualizada));
      setProdutos(listaAtualizada);
      limparCampos();
    } catch (e) {
      showModal('Erro', 'Não foi possível salvar/atualizar o produto.');
    }
  };

  const excluirProduto = async (id) => {
    try {
      // Filtra o produto a ser excluído da lista
      const listaAtualizada = produtos.filter(prod => prod.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(listaAtualizada));
      setProdutos(listaAtualizada);
      showModal('Sucesso', 'Produto excluído com sucesso!');
    } catch (e) {
      showModal('Erro', 'Não foi possível excluir o produto.');
    }
  };

  const limparCampos = () => {
    setDescricao('');
    setQuantidade('');
    setValor('');
  };

  // --- Componentes da Interface (UI) ---

  // Função para pré-preencher os campos para edição
  const iniciarEdicao = (produto) => {
    setProdutoEmEdicao(produto);
    setDescricao(produto.descricao);
    setQuantidade(produto.quantidade.toString());
    setValor(produto.valor.toString());
  };

  // Componente de item da lista com botões de ação
  const renderItem = ({ item }) => (
    <View style={styles.produtoItem}>
      <Text style={styles.produtoText}>ID: {item.id}</Text>
      <Text style={styles.produtoText}>Descrição: {item.descricao}</Text>
      <Text style={styles.produtoText}>Quantidade: {item.quantidade}</Text>
      <Text style={styles.produtoText}>Valor: R$ {item.valor.toFixed(2)}</Text>
      <View style={styles.itemButtons}>
        <TouchableOpacity style={styles.editButton} onPress={() => iniciarEdicao(item)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => excluirProduto(item.id)}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Produtos</Text>

      {/* Formulário de Cadastro/Edição */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={setQuantidade}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />
        <Button title={produtoEmEdicao ? "Atualizar Produto" : "Cadastrar Produto"} onPress={salvarProduto} />
      </View>

      <Text style={styles.listaTitulo}>Lista de Produtos</Text>

      {/* Botão de Listar Produtos (opcional, já que a lista carrega ao iniciar) */}
      <View style={styles.buttonContainer}>
        <Button title="Recarregar Lista" onPress={carregarProdutos} />
      </View>

      {/* Lista de Produtos */}
      <FlatList
        data={produtos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.lista}
        ListEmptyComponent={() => <Text style={styles.emptyText}>Não há produtos cadastrados.</Text>}
      />

      {/* --- O MODAL --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <Button title="OK" onPress={hideModal} />
          </View>
        </View>
      </Modal>
      {/* --- FIM DO MODAL --- */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  listaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lista: {
    flex: 1,
  },
  produtoItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  produtoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  itemButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    marginBottom: 20,
    textAlign: 'center',
  },
});