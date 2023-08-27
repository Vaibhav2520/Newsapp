import {
  Box,
  CardActionArea,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState, React } from "react";
import "../styles/landing.css";


const Landing = (props) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader , setLoader] = useState(false);
  function handleClick() {
    setLoading(true);
  }
  // use effect to call an API for fetching news
  useEffect(() => {
    setLoader(true);
    fetch(
      "https://newsapi.org/v2/everything?q=bitcoin&apiKey=3ecb01af5aed435287c272f5844de507"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNews(data.articles);
        setLoader(false);
        console.log(data.articles);
      });
  }, []);
  const newsClickHandler = (article) => {
    window.open(`news-detail?title=${article.title}`);
  };
  const GridNews = (
    <Box sx={{ flexGrow: 1 }} >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        className="container-grid"
      >
        {news.map((article, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={() => newsClickHandler(article)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={article.urlToImage}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.description}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActions>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <Typography>{article.author}</Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
  const NewsList = (
    <Grid container spacing={5}>
      {news.map((newsItem, index) => (
        <Grid
          item
          key={index}
          lg={6}
          onClick={() => newsClickHandler(newsItem)}
        >
          <Grid
            container
            spacing={2}
            flexDirection={"row"}
            className="list-item-container"
          >
            <Grid item lg={5}>
              <img
                style={{ width: "100%" }}
                src={newsItem.urlToImage}
                alt={newsItem.title}
              />
            </Grid>
            <Grid item lg={4}>
              <h2>{newsItem.title}</h2>
            </Grid>
            <Grid item lg={3}>
              <p className="source">{newsItem.source.name}</p>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
  return (
    <div className="news-list">
    {
      loader?<img src="/25.svg" alt="loading"/>:
      <div>
      <FormControlLabel
        sx={{
          display: "block",
        }}
        control={
          <Switch
            checked={loading}
            onChange={() => setLoading(!loading)}
            name="loading"
            color="primary"
          />
        }
        label="List"
      />
      <br />
      <br />
      {loading ? NewsList : GridNews}
      </div>

    }
    </div>
  );
};

export default Landing;
