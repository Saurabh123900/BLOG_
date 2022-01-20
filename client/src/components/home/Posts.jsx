
import { makeStyles , Grid } from "@material-ui/core";
import Post from './Post'
import {Link,useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react';
import {getAllPosts} from '../../service/api';


const useStyles = makeStyles ({
    link :{
        textDecoration: 'none',
        color : 'inherit'
    }
})

const Posts = () => {
    const [posts,setPosts] = useState([]);
    const classes = useStyles();

    const {search} = useLocation();
    useEffect(()=>{
        const fetchData = async () =>{
            let data = await getAllPosts(search);
            console.log(data);
            setPosts(data);
        }
        fetchData();
    },[search])

    return (
    posts.map(post=>(
        <Grid item lg={3} sm={4} xs={12}>
            <Link to={`/details/${post._id}`} className = {classes.link} >
               <Post post={post}/>
            </Link>
        </Grid>
    )) 
    )
}

export default Posts ;