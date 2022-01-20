
import {Box,makeStyles, FormControl,InputBase,Button, TextareaAutosize} from '@material-ui/core'
import { AddCircle } from '@material-ui/icons';
import { useState ,useEffect } from 'react';

import {createPost, uploadFile} from '../../service/api.js'

import { useHistory } from 'react-router';

const useStyle = makeStyles((theme)=>({
    container: {
        padding : '0 100px',
        [theme.breakpoints.down('md')]: {
            padding: 0
        },
    },
    image: {
        width: '100%',
        height: '50vh',
        objectFit: 'cover'
    },
    form: {
        display : 'flex',
        flexDirection : 'row',
        marginTop : 10
    },
    textfeild : {
        flex : 1,
        margin : '0 30px',
        fontSize: 25
    },
    txtArea :{
        width : '100%',
        marginTop : 50,
        border : 'none',
        fontSize : 18,
        '&:focus-visible' : {
            outline : 'none'
        }
    },
    icons: {
        float: 'right'
    },
    icon: {
        margin: 5,
        padding: 5,
        border: '1px solid #878787',
        borderRadius: 10
    },
    heading: {
        fontSize: 38,
        fontWeight: 600,
        textAlign: 'center',
        margin: '50px 0 10px 0'
    },
    author: {
        color: '#878787',
        display: 'flex',
        margin: '20px 0',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    subheading: {
        color : '#878787',
        display : 'flex',
        margin : '20px 0',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
    }
}))

const initialValues = {
    title : '',
    description : '',
    picture : '',
    username: '100gods',
    categories : 'All',
    createdDate : new Date ()
}

const CreateView = () => {
    const classes = useStyle();
    
    const [post, setPost] = useState(initialValues);
    const [file, setFile] = useState('');
    const [image,setImage] = useState('');


    const url = post.picture || 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    const handleChange = (e) => {
        setPost({...post,[e.target.name]: e.target.value })
    }

    const savePost = async () => {
        await createPost (post);
        history.push('/')
    }

    useEffect(()=>{
        console.log(file);
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file",file);

                const image = await uploadFile(data);
                post.picture = image.data;
                setImage(image.data);
            }
        }
        getImage();
    },[file]);

    const history = useHistory();

    return (
        <Box className = {classes.container}>
            <img className = {classes.image} src={url} alt="banner"></img>

            <FormControl className={classes.form}> 

                <label htmlFor = "fileInput">
                    <AddCircle fontSize = "large" color = 'action' />
                </label>  

                <input
                    type = 'file'
                    id = "fileInput"
                    style = {{display: 'none'}}
                    onChange = {(e) => {
                        setFile(e.target.files[0])
                    }}
                />

                <InputBase onChange={(e) => handleChange(e)} 
                    placeholder ="Title" 
                    className = {classes.textfeild}
                    name = 'title'
                />
                <Button onClick={()=>savePost()} variant = "contained" color = "primary">Publish</Button>
            </FormControl>

            <TextareaAutosize
                rowsMin = '5'
                placeholder = "Tell about your Story ..."
                className = {classes.txtArea}
                onChange={(e) => handleChange(e)}
                name = 'description'
            />

        </Box>
    )
}

export default CreateView ;

