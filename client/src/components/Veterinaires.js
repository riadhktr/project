import React ,{useEffect,useState} from 'react'
import {getveterinaires} from '../api/userApi'
import VetCard from './vetCard'
import {useDispatch,useSelector} from 'react-redux'
import {setVets } from '../store/userSlice'

import Form from 'react-bootstrap/Form';

const Veterinaires = () => {

  const [selected, setSelected] = useState();

  const location = [
    "all",
    "Ariana", "Béja","Ben Arous",  "Bizerte","Gabès","Gafsa","Jendouba","Kairouan","Kasserine"
      ,"Kébili"
     , "Kef"
      ,"Mahdia"
      ,"Manouba"
      ,"Médnine"
      ,"Monastir"
      ,"Nabeul"
      ,"Sfax"
      ,"Sidi Bouzid"
      ,"Siliana"
      ,"Sousse"
     ,"Tataouine"
      ,"Tozeur"
      ,"Tunis"
      ,"Zaghouan"
    
];

const handleChange = (e)=>{

  setSelected(e.target.value)
  }

  const dispatch = useDispatch()
  const users = useSelector(state=>state.user)

  const getAccount=async()=>{
  const data = await getveterinaires()
  dispatch(setVets(data.users))
 
 }
  useEffect(()=>{
  getAccount();
 },[])


  return (
    <div>
    <div>
    <h2 style={{textAlign:"center"}}>You can find your best veterinary here</h2>
    
    </div>
    <div style={{display:'flex', flexWrap:'wrap'}}>
      
      { users.map((el,key)=>(<VetCard  key={el._id} users={el}  getAccount={getAccount}/>))
      
}
   
    </div>
    
      </div>
  )
}

export default Veterinaires