import React,{useState,useEffect} from 'react';
import {deleteComment,updateComment} from '../api/forumApi';
import {useDispatch,useSelector} from 'react-redux'
import {setAccount} from '../store/accountSlice'
import {fetchAccount} from '../api/userApi'
import {Button} from 'react-bootstrap'
import {  Comment } from 'semantic-ui-react'

const ForumCard = ({comment,getComment}) => {
  
  const [show,setSHow] = useState(false);
  const [content,setContent] = useState();
  const dispatch = useDispatch()
  const account = useSelector(state=>state.account)

  const getUser=async()=>{
  const data = await fetchAccount()
  dispatch(setAccount(data))
   
  }
  useEffect(()=>{
    getUser();
    
  },[])

  const deleteHandler = async()=>{
    await deleteComment(comment._id);
    getComment();
    }
    
  const handelShow = ()=>{
  setSHow(!show);
  
}

    const updateHandler = async()=>{
      
      await updateComment(comment._id,{content});

      setContent('');
      setSHow(false)
      getComment();
     
    
      }
      
      
return (
 <div style={{marginLeft:"10%",marginTop:"7%"}}>
  <Comment.Group>
    

    <Comment>
      <Comment.Avatar  src={`/public/uploads/${comment.user.img}`}/>
      <Comment.Content>
        <Comment.Author as='a'>{comment.user.firstName} {comment.user.lastName}</Comment.Author>
        <Comment.Metadata>
          <div>{comment.updatedAt}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.title}</Comment.Text>
        <Comment.Text>{comment.content}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>
          { show && <div> <input type='text' name='content' onChange={(e)=>setContent(e.target.value)} 
            style={{ marginLeft:'10px'}} />
           
            <Button style={{backgroundColor:'transparent',color:'black', marginLeft:'10px'}} onClick={updateHandler}> Update </Button></div>
            }
          
            
        {(comment.user._id === account._id) ? 
        <div style={{display:"flex",justifyContent:"flex-end"}}>
        <button style={{border:'none',backgroundColor:"transparent"}} onClick={handelShow}><i className='fas fa-pen'></i></button>
        <button style={{border:'none',backgroundColor:"transparent",marginRight:"20px"}} onClick={deleteHandler}><i className='fas fa-trash '></i></button></div> : null }
      
  
          </Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
    </Comment.Group>
    
            
        

</div>
  )
}

export default ForumCard