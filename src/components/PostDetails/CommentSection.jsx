import React, { useState, useRef,useEffect } from 'react';
import { Typography, TextField,Grid, Button,LinearProgress } from '@material-ui/core/';
import { useDispatch,useSelector } from 'react-redux';
import { commentPost } from '../../actions/posts';
import useStyles from './styles';

const CommentSection = ({ post }) => {
  const loadingStatus = useSelector((state) => state.posts.commentLoading);
  console.log(loadingStatus);
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const [commentLoad, setCommentLoad] = useState(false);
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();
  

  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

    setComment('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth',block: 'nearest', inline: 'start' });
  };

  useEffect(() => {
    setCommentLoad(loadingStatus);
   
  } ,[loadingStatus])

  return (
    <div>
          <Typography gutterBottom variant="h6">Comments</Typography>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (

        <div  className={classes.commentsSection}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth minRows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
            Comment
            {commentLoad ? (
              <Grid spacing={1} container className={classes.loadAnimation}>
              <Grid xs item>
                  <LinearProgress   color='secondary' />
              </Grid>
              
          </Grid>
            ) : null}
            
          </Button>
        </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;