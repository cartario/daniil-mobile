import React from 'react';
import { Text, View, StyleSheet, FlatList} from 'react-native';
import AppLoader from '../components/AppLoader';
import Studio from '../components/Studio';

const StudiosScreen = ({ navigation }) => {

  const [studios, setStudios] = React.useState();

  const handleOpen = (studio) => {
    
    navigation.navigate('Studio', {
      studioId: studio.id,      
      studioTitle: studio.title,
    });
  };  

  React.useEffect(()=>{
    async function fetchStudios () {
      try{
        const response = await fetch(`https://centerdaniil.ru/api/studios`);
        const data = await response.json();
        
        const adapter = (data) => {
          data.forEach((studio)=>
            studio.id = studio._id
          )
          return data.filter((item)=>!item.isDuplicate).sort((a,b)=>b.adress - a.adress); //отсеивает дубли
        }

        setStudios(adapter(data));
       
      }
      catch(err){
        console.log(err)
        throw err;       
      }
    }
    fetchStudios();
  },[]);

  if(!studios){
    return <AppLoader />
  }

  return (<>
  
    <View style={styles.wrap}>
      
      {studios.length ? <FlatList
        keyExtractor={(item) => item.id}
        data={studios}
        renderItem={({ item }) => <Studio studio={item} onOpen={()=>handleOpen(item)}/>}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      /> : 
      <View style={styles.noStudios}>
        <Text>no-studios</Text>  
      </View>}
    </View></>
  );
};

export default StudiosScreen;

const styles = StyleSheet.create({
  wrap: {
    padding: 10
  },
  noStudios: {    
    alignItems: 'center',
    justifyContent: 'center',
  },
});
