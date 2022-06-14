import React from "react";
import { Grid, CircularProgress,Paper,Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";
import svgimage from '../../images/SearchEngine.svg';

const Posts = ({ setCurrentId }) => {
  const {posts,isLoading} = useSelector((state) => {
    // Comes from reducers index
    return state.posts;
  });
  const classes = useStyles();


// No Posts Message
const Noposts = () => {
    return (
     <Paper elevation={4}>
       <div className={classes.noPostOuter}>
            <Typography variant="h2" color="primary" className={classes.mainText}>
              Sorry but no posts have been found matching your search.
            </Typography>
            <img src={svgimage} alt='svg' className={classes.svgImage} />
       </div>
     </Paper>
    )
  }



  if(!posts.length && !isLoading) return <Noposts/>;
  return (
    // If no posts show progress
    

    isLoading ? (
      <CircularProgress />
    ) : (
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
