import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Button, FlatList, Image, View, StyleSheet, ActivityIndicator} from 'react-native';

const App = () => {

  // states para mudar o status de loading e adicionar os filmes em cartaz.
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]); // Cria state vazia

  // useEffect uma função que executa toda vez que o app é inicializado.
  useEffect(()=>{
    // Função requisita dados via json da API e pega todos (Função assincrona).
    const requestMovies = async () => {
      setLoading(true);
      const req = await fetch("https://api.b7web.com.br/cinema/");
      const json = await req.json(); // transforma a requisão em json respectivamente.
  
      // Depois de fazer a requisição ao servidor, verifica se retornou algo.
      if(json) {
        setMovies(json);
      }
      setLoading(false);
    }
    requestMovies();
  }, []);

  // {loading &&} é um condição que verifica se o state setLoading está como true,
  // se sim, mostra um indicador de loading. caso contrario {!loading &&} mostra os
  // filmes em cartaz.
  return (
    <SafeAreaView style={styles.container}>
      {loading && 
        <View style={styles.loadingArea}>
          <ActivityIndicator size="large" color="#FFF"/>
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      }
      {!loading && 
        <>
          <Text style={styles.totalMoveisText}>Total de Filmes: {movies.length}</Text>
          <FlatList style={styles.list}
            data={movies}
            renderItem={({item})=>(
              <View style={styles.movieItem}>
                <Image 
                  source={{ uri: item.avatar }}
                  style={styles.movieImage}
                  resizeMode='contain'
                />
                <Text style={styles.movieTitle}>{item.titulo}</Text>
              </View>
            )}
            keyExtractor={item => item.titulo}
          />
        </>
      }
    </SafeAreaView>
  );
}

// Criando estilizações.
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#495057'
  },
  totalMoveisText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  loadingArea:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText:{
    color: '#FFFFFF',
    marginTop: 10,
  },
  list: {
    flex: 1
  },
  movieItem:{
    marginBottom: 40
  },
  movieImage:{
    height: 400
  },
  movieTitle:{
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5
  }
});

export default App;
