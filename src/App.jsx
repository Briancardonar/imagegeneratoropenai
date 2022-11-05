import { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import * as Yup from 'yup';
import './App.css'
import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [issetImage, setIssetImage] = useState(false);
  const [canSearchImage, setCanSearchImage] = useState(false);

  const key = import.meta.env.VITE_OPENAI_API_KEY;

  const configuration = new Configuration({
    apiKey: key,
  })

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setIsLoading(true);

    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });

    if (response.status == 200) {
      setResult(response.data.data[0].url);
      setIsLoading(false);
      setIssetImage(true);
    } else {
      console.log(response);
    }
  };

  const isWritingInField = (e) => {
    setPrompt(e.target.value);

    e.target.value ? setCanSearchImage(true) : setCanSearchImage(false);
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h5">Inteligencia artificial para crear imagenes</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Ingrese un texto"
          size='medium'
          onChange={isWritingInField} />
      </Grid>
      {isLoading ?
        <>
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Generando imagen</Typography>
          </Grid>
        </>
        : issetImage && (<Grid item xs={12}>
          <img src={result} alt="result" />
        </Grid>)}
      {!isLoading && (<Grid item xs={12}>
        <Button variant="contained" onClick={generateImage} disabled={!canSearchImage}>Generar imagen</Button>
      </Grid>)}
    </Grid>

  )
}

export default App;
