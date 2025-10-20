import 'react-quill/dist/quill.snow.css';
import React ,{useContext, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";
import { UserContext } from "../UserContext";
import api from "../utils/api";
import styled from 'styled-components'
import { useLocation } from "react-router-dom";
import {mobile} from '../responsive'
const Container = styled.div`
  padding: 20px;
  margin: 50px 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mobile({
    margin: '0px',
  })}
`;

const Heading = styled.h1`
  font-size: 40px;
  text-align: center;
  padding: 20px;
  font-family: 'Libre Baskerville', serif;
  color: #0a4423;

  ${mobile({
    fontSize: '30px',
    padding: '0px',
  })}
`;

const Form = styled.form``;

const FormItem = styled.input`
  font-size: 20px;
  padding: 10px;
  margin: 10px;
  border: 1px black solid;

  ${mobile({
    fontSize: '12px',
    padding: '8px',
    margin: '5px 0px',
  })}
`;

const Button = styled.input`
  background-color: #0a4423;
  color: white;
  font-size: 20px;
  padding: 10px 20px;
  border: 1px black solid;
  border-radius: 5px;
  cursor: pointer;

  ${mobile({
    fontSize: '12px',
    padding: '5px',
  })}
`;

export default function CreatePost() {
  const location = useLocation();
  const postForEdit = location.state;

  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {userInfo, setUserInfo} = useContext(UserContext);
  const [editMode, setEditMode] = useState(false)

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if(postForEdit) {
      setEditMode(true)
      setTitle(postForEdit.title)
      setDescription(postForEdit.description)
      setContent(postForEdit.content)
      setFiles(postForEdit.cover)

    }
  }, [])
  


  async function createNewPost(ev) {
    ev.preventDefault();
    
    const data = {
      title: title,
      description: description,
      content: content,
      cover: selectedImage,
      author: userInfo.username,
    }
    if(!editMode){
        //creating
        try {
          api.post('/posts', data)
          .then((res) => {
            alert("Blog created")
            setRedirect(true)
          })
          
        } catch (error) {
          console.error(error);
        }
    }
    else{
      //updating
      try{
        api.put(`/posts/${postForEdit._id}`, data)
        .then((res) => {
          alert("Blog updated")
          setRedirect(true)
        })
        
      }
      catch(err) {
        console.log(`the error was ${err}`)
      }

    }
      
    
    
    
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
<Container>
    <Heading>
      Create new blog 
    </Heading>
    <Form onSubmit={createNewPost}>
      <FormItem 
        type="text" 
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} 
      />
      <br/>
      <FormItem 
        type="text" 
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br/>
      <FormItem 
        type="file"
        onChange={handleImageSelect}
      />
      <Editor 
        value={content} 
        onChange={setContent}
      />
      <Button 
        value= {editMode? "Edit" : "Create"}
        type="submit" 
      />
    </Form>
  </Container>
  )
  
}
  