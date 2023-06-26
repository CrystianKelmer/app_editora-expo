import React from "react"
import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import { DataContext } from "../../context/DataContext";
import { useContext, useState, useEffect } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { TouchableOpacity } from "react-native-gesture-handler";
import { save, delEditora, getValueFor} from "../../services/DataServices";

const Home = () => {
  const { dadosUsuario } = useContext(DataContext);
  const [dadosEditora, setDadosEditora] = useState();

  useEffect(() => {
    getAllEditoras();
  }, []);


  const Item = ({ objEditora }) => (
    <TouchableOpacity onPress={() => saveEditora('editora', objEditora.codigoEditora)}>
       <Image
        style={styles.tinyLogo}
        source={{
        uri: `data:image/png;base64,${objEditora.img}`
      }}
    />
    </TouchableOpacity>
  );

const saveEditora = async (key, value) =>{
    await save(key, value);
}

  const getAllEditoras = async () => {
    await AxiosInstance.get(
      '/editoras',
      { headers: { "Authorization": `Bearer ${dadosUsuario?.token}` } }
    ).then(resultado => {
      console.log('getAllEditoras: ' + JSON.stringify(resultado.data));
      setDadosEditora(resultado.data);
    }).catch((error) => {
      console.log('Ocorreu um erro ao recuperar os dados das Editoras:' + error);
    })

  }
  return (
    <View style={styles.container}>
      <Text style={styles.txtEditoras}>Editoras</Text>
      <TouchableOpacity onPress={() => delEditora('editora')}>
        <Text>Deletar Editoras</Text>
      </TouchableOpacity>
      <FlatList
        data={dadosEditora}
        renderItem={({ item }) => <Item objEditora={item} />}
        keyExtractor={item => item.codigoEditora}
        horizontal={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    marginTop: 16,
    fontSize: 32,
    fontWeight: 'bold'
  },
  tinyLogo: {
    margin: 10,
    width: 50,
    height: 50
  },
});
export default Home;