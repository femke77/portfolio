import * as projects from "../../assets";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'


export default function Project({project}) {
  const { name, repo, link, description, image } = project;

  
  return (
    <Paper elevation={10} sx={{ maxWidth: 345, margin: '16px auto' }}>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={projects[image]}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom sx={{textAlign:"center"}} variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body" sx={{ color: 'text.secondary', textAlign:"center" }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <a href={link} target='_blank' rel="noreferrer"><Button size="small">Demo</Button></a>
        <a href={repo} target="_blank" rel="noreferrer"><Button size="small">GitHub</Button></a>       
      </CardActions>
    </Card>
    </Paper>
  );
}