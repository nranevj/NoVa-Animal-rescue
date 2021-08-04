import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import { Pagination } from './Pagination';
import "../css/Feed.css";
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import formbackground from '../assets/formbackground.jpg'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "80%",
    marginLeft: "2%",
    marginTop: "2%",
    marginBottom: "2%",
    '&:first-of-type': {
      marginTop: "5%"
    }
  },
  addPost: {
    margin: theme.spacing(1),
    color: "#3f51b5",
    background: "white",
    '&:hover': {
      backgroundColor: "#3f51b5",
      color: "white"
    },
    width: "25vw",
    height: "4vw",
    fontSize: "large"
  },
  editPost:{
    margin: theme.spacing(1),
    color: "black",
    background: "white",
    '&:hover': {
      backgroundColor: "black",
      color: "white"
    },
    width: "6vw",
    height: "4vw",
    fontSize: "large",
    marginBottom: "30%"
  },
  deletePost:{
    margin: theme.spacing(1),
    color: "black",
    background: "white",
    '&:hover': {
      backgroundColor: "black",
      color: "white"
    },
    width: "6vw",
    height: "4vw",
    fontSize: "large",
    marginBottom: "25%"
  },
  logout: {
    margin: theme.spacing(1),
    marginLeft: "23%",
    color: "red",
    background: "white",
    '&:hover': {
      backgroundColor: "red",
      color: "white"
    },
    width: "10vw",
    height: "4vw",
    fontSize: "large"
  },
  submitstory:{
    margin: theme.spacing(1),
    marginLeft: "4%",
    color: "green",
    background: "white",
    '&:hover': {
      backgroundColor: "green",
      color: "white"
    },
    width: "10vw",
    height: "4vw",
    fontSize: "large"
  },
  cancelstory:{
    margin: theme.spacing(1),
    marginLeft: "2%",
    color: "red",
    background: "white",
    '&:hover': {
      backgroundColor: "red",
      color: "white"
    },
    width: "10vw",
    height: "4vw",
    fontSize: "large"
  },
  media: {
    height: "100%",
    paddingLeft: "2%",
    paddingRight: "3%",
    width: "75%",
    display: "inline-block"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  favicon:{marginBottom: "22%", fontSize: "3em", marginLeft: "2vw", marginRight: "2vw", "&:hover": {cursor: "pointer"}},
  paper: {
    position: 'absolute',
    width: "90%",
    height: "95%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    backgroundImage: `url(${formbackground})`,
    backgroundSize: "cover"
},
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalform: {
    width: "100%",
    maxWidth: "100%",
    height: "90%",
    marginLeft: "10%",
    fontSize: "1.5vw",
    display: "inline-block",
    marginTop: "1%",
    color: "white",
    lineHeight: "2"
  }
}));

export function Feed() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [post, setPostArray] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [title, setTitle] = useState("");
  const [shortdesc, setShortDesc] = useState("");
  const [longdesc, setLongDesc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [itemId, setItemId] = useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setLoading(true);
    const apiUrl = 'http://localhost:3001/post';
    axios.get(apiUrl)
        .then((response) => {
            setPostArray(response.data.slice());
            setLoading(false);
        })
    .catch((err)=>{
        console.log(err);
    });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  //Changing page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Load form for creating new post
  const showModalForm = () => {
    setOpen(true);
  };

  //Hide form after submitted or close button/cancel button is clicked
  const hideModalForm = () => {
    setOpen(false);
    setEditForm(false);
    setItemId("");
  };

  const editModalForm = (item) =>{
    setItemId(item._id);
    setEditForm(true);
    showModalForm();
  }

  //Make a REST API call to delete the specified post from DB
  const deletePost = (item) => {
    let id = item._id;
    console.log(id);
    let config = {
      method: 'delete',
      url: 'http://localhost:3001/post/' + id,
      headers: { }
    };

    axios(config)
    .then(function (response) {
      console.log(response);
      createNotification('success', 2000, "Story deleted successfully");
      setPostArray(post.filter(item => item._id !== id));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const clearModalInputFields = () => {
    setTitle("");
    setImageFile(null);
    setShortDesc("");
    setLongDesc("");
  }

  const cancelStory = () => {
    clearModalInputFields();
    hideModalForm();
  }

  const createNotification = (type, delay, message = "") => {
    switch (type) {
      case 'info':
        NotificationManager.info(message);
        break;
      case 'success':
        NotificationManager.success('Success message', message, delay);
        break;
      case 'warning':
        NotificationManager.warning('Warning message', message, delay);
        break;
      case 'error':
        NotificationManager.error('Error message', message, delay, () => {
          alert('callback');
        });
        break;
    }
  }

  //Returns current form data
  const getFormData = () => {
    let data = new FormData();
    if(title) data.append('title', title);
    if(imageFile) data.append('postImage', imageFile);
    if(shortdesc) data.append('shortdesc', shortdesc);
    if(longdesc) data.append('longdesc', longdesc);
    return data;
  }
  
  //Make a REST API call to edit the mentioned parameters in specified post in DB
  const updateStory = () => {
    let data = getFormData();
    let object = {};
    data.forEach((value, key) => object[key] = value);
    let json = JSON.stringify(object);

    let config = {
      method: 'patch',
      url: 'http://localhost:3001/post/'+ itemId,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : json
    };

    axios(config)
    .then(function (response) {
      clearModalInputFields();
      createNotification('success', 2000, "Story updated successfully");
      setTimeout(hideModalForm,500);
      let id = response.data._id;
      console.log(id);

      const apiUrl = 'http://localhost:3001/post/' + id;
      axios.get(apiUrl)
        .then(async (response) => {
            let data = await response.data[0];
            let id = await response.data[0]._id;
            let index = -1;
            for(let i=0 ; i<post.length; i++){
              if(post[i]._id === id){
                index = i;
                break;
              }
            }
            
            if(index >= 0){
              let newPost = post;
              newPost[index] = data;
              setPostArray(newPost); 
            }
        })
    .catch((err)=>{
        console.log(err);
    });
    })
    .catch(function (error) {
      createNotification('error', 2000, "Issue updating story: " + error);
    });
  }

  //Make a REST API call to add new post in DB with the provided data
  const submitStory = () => {
    let formData = getFormData();
    axios
    .post('http://localhost:3001/post', formData)
    .then((res) => {
      clearModalInputFields();  
      createNotification('success', 3000, "Story submitted successfully");
      setTimeout(hideModalForm,500);
      let id = res.data._id;

      const apiUrl = 'http://localhost:3001/post/' + id;
      axios.get(apiUrl)
        .then(async (response) => {
            let data = await response.data[0];
            let newPost = post;
            newPost.unshift(data);
            setPostArray(newPost); 
        })
        .catch((err)=>{
          console.log(err);
        });
    })
    .catch((err) => {createNotification('error', 2000, "Issue submitting story:" + err);});
  } 

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  else{
    return (<><div style={{width: "100%", height: "100%", marginTop: "2%"}}>
    <div style={{width: "65%", display: "inline-block", float: "left"}}>
    {post.slice(indexOfFirstPost, indexOfLastPost).length === 0 ? <div style={{textAlign: "center", marginTop: "5%", fontSize: "2vw"}}>No rescue stories so far</div> : ""}
    {post.slice(indexOfFirstPost, indexOfLastPost).map((item, i) => (
        <Card className={classes.root}>
        <CardHeader
            key={i}
            title={item.title}
            subheader={new Date(item.date).toGMTString()}
            action={
              <IconButton aria-label="settings">
              </IconButton>
            }
        />
        <CardMedia
            component="img" 
            className={classes.media}
            src={item.postImage}
            title= {item.title}
        />
        <table>
          <tbody>
          <tr>
            <td><Button variant="contained" color="primary" className={classes.editPost} onClick={() => editModalForm(item)}>Edit</Button></td>
          </tr>
          <tr>
            <td><Button variant="contained" color="primary" className={classes.deletePost} onClick={() => {deletePost(item)}}>Delete</Button></td>
          </tr>
          </tbody>
        </table>
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
            {item.shortdesc}
            </Typography>
        </CardContent>
        <CardActions disableSpacing style={{paddingTop: "0", float: "right"}}> 
            <IconButton
            className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
            })}
            
            onClick = {() => handleExpandClick()}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon></ExpandMoreIcon>
            </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent style={{marginTop: "4%", textAlign: 'justify'}}>
            <Typography paragraph style={{width: "95%"}}>
                {item.longdesc}
            </Typography>
            </CardContent>
        </Collapse>
        </Card>
        ))}
        {post.slice(indexOfFirstPost, indexOfLastPost).length !== 0 ? <Pagination postsPerPage={postsPerPage} totalPosts={post.length} paginate={paginate}/> : ""}
    </div>
    <div style={{width:"35%", display: "inline-block", float: "left", marginTop: "10%", position: "fixed"}}>
      <Button variant="contained" color="primary" className={classes.addPost} onClick={showModalForm}>
        We want hear your story!
      </Button>
      <Button variant="contained" color="primary" className={classes.logout}>
        Logout
      </Button>
    </div>
    </div>
    <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    className={classes.modal}
    open={open}
    onClose={hideModalForm}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
        timeout: 500,
    }}
>
    <Fade in={open}>
      <div className={classes.paper}>
        <h1 style={{textAlign: "center", color: "white", background: "#3f51b5", marginTop: "0", height: "4.5vw", paddingTop: "1%"}}>{editForm ? "Kindly fill the details that you want to update" : "Please enter the details"}</h1>

        <div className={classes.modalform}>
          <form action="" name="modalFormNewPost">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="ptitle" placeholder="Enter a short and descriptive title" value={title} onChange={(e) => setTitle(e.target.value)} /><br/>
            <label htmlFor="img">Select image</label>
            <input type="file" id="postImage" name="img" accept="image/*" style={{color: "black"}} onChange={(e) => setImageFile(e.target.files[0])}></input><br/>
            <label htmlFor="shortdesc">Short description</label><br/>
            <textarea cols="60" rows="5" id="shortdesc" placeholder="Try to keep it within 10-15 words" value={shortdesc} onChange={(e) => setShortDesc(e.target.value)}></textarea><br/>
            <label htmlFor="longdesc">Long description</label><br/>
            <textarea cols="60" rows="15" id="longdesc" placeholder="Here you can write everything in detail in a well formatted way" value={longdesc} onChange={(e) => setLongDesc(e.target.value)}></textarea><br/>
            <Button variant="contained" color="primary" className={classes.submitstory} onClick={editForm ? updateStory : submitStory}>
              {editForm ? "Update story" : "Submit story"}
            </Button>
            <Button variant="contained" color="primary" className={classes.cancelstory} onClick={cancelStory}>
              Cancel
            </Button>
          </form> 
        </div>
      </div>
    </Fade>
</Modal>
<NotificationContainer/>
</>
    );
  }  
}
