import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  noPostOuter:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between'
  },
  mainText:{
    textAlign:'center',
    padding:'10px',
    fontWeight:'600 ',
    [theme.breakpoints.down('md')]: {
      fontSize: '30px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
    },
  },
  svgImage:{
    maxHeight: '600px',
  }
}));