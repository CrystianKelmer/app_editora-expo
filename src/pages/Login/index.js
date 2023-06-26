import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useState, useContext } from 'react';
import AxiosInstance from '../../api/AxiosInstance';
import { DataContext } from '../../context/DataContext'
import { StatusBar } from 'expo-status-bar';

const Login = ({ navigation }) => {
  // State dentro do Login

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { armazenarDadosUsuario } = useContext(DataContext);

  //No onPress chama em arrow function {() => handleLogin()}
  // metodo do onPress
  //default function Login(){}
  const handleLogin = async () => {
    console.log(`Email: ${email} - Senha: ${senha}`);

    try {
      const resultado = await AxiosInstance.post('/auth/signin', {
        username: email,
        password: senha
      });

      if (resultado.status === 200) {
        //accessToken
        var jwtToken = resultado.data;
        //formas de acessar o json
        armazenarDadosUsuario(jwtToken["accessToken"]);

        navigation.navigate("Home");
      } else {
        console.log('Erro ao realizar o login');
      }
    } catch (error) {
      console.log('erro durante o processo de login: '+ error);
    }
  };

  //obrigatorio o return dentro dele a estrutura da pagina. Só aceita components do react native
  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      <Text style={styles.txt}>Welcome!</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setSenha}
        value={senha}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.txtButton}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: '20',
    fontWeight: 'bold',
    marginBottom: '30'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 9,
  },
  txtButton: {
    color: 'white'
  },

});

export default Login;