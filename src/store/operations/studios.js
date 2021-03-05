import {ActionCreators} from '../actions/studios';
import {Http} from '../../http';

const BASE_URL = 'https://centerdaniil.ru/api/studios';

export const Operations = {
  fetchStudios: ()=>async (dispatch)=>{
    // dispatch(ActionCreators.setLoader(true));    
    try{
      const studios = await Http.get(BASE_URL);

      const adapter = (data) => { //адаптирую ответ сервера к своей структуре данных
        data.forEach((studio)=>
          studio.id = studio._id
        )
        return data
      }
      
      dispatch(ActionCreators.setStudios(adapter(studios)));      
    } 
    catch(err){
      console.log(err)
    } 
    finally{
      // dispatch(ActionCreators.setLoader(false));
    }
  },
}
