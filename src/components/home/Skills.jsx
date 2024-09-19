import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import javaScriptLogo from '../../assets/images/logos/javascript-logo.png';
import bootstrapLogo from '../../assets/images/logos/bootstrap-logo.png';
import cssLogo from '../../assets/images/logos/css-logo.png';
import expressLogo from '../../assets/images/logos/express-logo.png'
import githubLogo from '../../assets/images/logos/github-logo.png';
import handlebarsLogo from '../../assets/images/logos/handlebars-logo.png';
import mongodbLogo from '../../assets/images/logos/mongodb-logo.png';
import muiLogo from '../../assets/images/logos/mui-logo.png';
import nodeLogo from '../../assets/images/logos/nodeJS-logo.png';
import postgresqlLogo from '../../assets/images/logos/postgresql-logo.png';
import reactLogo from '../../assets/images/logos/react-logo.png';
import sequelizeLogo from '../../assets/images/logos/sequelize-logo.png';

const skills = [
  { title: "JavaScript", src: javaScriptLogo, alt: "JavaScript Logo" },
  { title: "Express", src: expressLogo, alt: "Express Logo" },
  { title: "Node.js", src: nodeLogo, alt: "Node.js Logo" },
  { title: "React", src: reactLogo, alt: "React Logo" },
  { title: "MUI", src: muiLogo, alt: "MUI Logo" },
  { title: "CSS", src: cssLogo, alt: "CSS Logo" },
  { title: "PostgreSQL", src: postgresqlLogo, alt: "PostgreSQL Logo" },
  { title: "MongoDB", src: mongodbLogo, alt: "MongoDB Logo" },
  { title: "Sequelize", src: sequelizeLogo, alt: "Sequelize Logo" },
  { title: "Bootstrap", src: bootstrapLogo, alt: "Bootstrap Logo" },
  { title: "Handlebars", src: handlebarsLogo, alt: "Handlebars Logo" },
  { title: "GitHub", src: githubLogo, alt: "GitHub Logo" },
];

// TODO gsap ticker animation
export default function Skills() {
  return (
    <div style={{marginTop: "120px", textAlign:"center", backgroundColor:"white", color: "black"}}>
      <h1>Skills and Technologies</h1>
    <Box id="skills" p={2}>
      <Grid container spacing={3}>
        {skills.map((skill, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <Box display="flex" justifyContent="center" alignItems="center" p={1} border={0} borderRadius={2}>
              <img
                src={skill.src}
                alt={skill.alt}
                title={skill.title}
                style={{ width: "100px", height: "100px", objectFit: "contain", backgroundColor: "transparent" }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
    </div>
  );
}
