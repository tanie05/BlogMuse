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
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background: #F2F2F2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mobile({
    padding: '20px',
    margin: '0',
  })}
`;

const Heading = styled.h1`
  font-size: 42px;
  text-align: center;
  padding: 30px 0;
  font-family: 'Roboto', sans-serif;
  color: #1E594E;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ${mobile({
    fontSize: '32px',
    padding: '20px 0',
  })}
`;

const Form = styled.form`
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${mobile({
    padding: '20px',
  })}
`;

const FormItem = styled.input`
  font-size: 16px;
  padding: 15px;
  border: 2px solid #E0E0E0;
  border-radius: 8px;
  background: #F9F9F9;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #1E594E;
    background: white;
    box-shadow: 0 0 0 3px rgba(30, 89, 78, 0.1);
  }

  &::placeholder {
    color: #999;
  }

  ${mobile({
    fontSize: '14px',
    padding: '12px',
  })}
`;

const Button = styled.input`
  background: linear-gradient(135deg, #1E594E 0%, #2A6B5F 100%);
  color: white;
  font-size: 18px;
  font-weight: 600;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  box-shadow: 0 4px 12px rgba(30, 89, 78, 0.3);

  &:hover {
    background: linear-gradient(135deg, #2A6B5F 0%, #1E594E 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(30, 89, 78, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  ${mobile({
    fontSize: '16px',
    padding: '12px 24px',
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
      <FormItem 
        type="text" 
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
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
  