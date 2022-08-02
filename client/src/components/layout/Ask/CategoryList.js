import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import useWindowDimensions from '../../../WindowHook'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


export default function TitlebarImageList({categories}) {
  const classes = useStyles();
	const { width } = useWindowDimensions();
  return (
    <div className={classes.root}>
      <ImageList cols={width > 600 ? 4: 2} gap={2}>
        {categories.map((item) => (
          <ImageListItem key={item.image} style={{padding:'2px'}}>
						<Link to={`/category/${item._id}`} style={{color:'#5B84B1FF'}}>
            <img src={item.image} alt={item.name}  style={{width:'250px',height: '125px',maxWidth:'100%'}}/>
            <ImageListItemBar
              title={item.name}
              actionIcon={
                <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                  <LinkIcon />
                </IconButton>
              }
            />
						</Link>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}