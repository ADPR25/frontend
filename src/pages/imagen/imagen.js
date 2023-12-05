
import React, { useState } from "react";
import { Grid, Stack, Button, Typography } from "@mui/material";
import { subirImagen } from '../../api/subir_imagen.ts';


const Imagenes = () => {
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const handleImagenChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubirImagen = async () => {
    try {
      if (!imagen) {
        console.error("Por favor selecciona una imagen.");
        return;
      }

      const formData = new FormData();
      formData.append("image", imagen);

      const response = await subirImagen(formData);

      console.log("Respuesta del backend:", response);

      setMensaje("La imagen se ha subido correctamente.");
    } catch (error) {
      console.error("Error al subir la imagen:", error.message);
      setMensaje("Error al subir la imagen. Por favor, intenta de nuevo.");
    }
  };

  return (
    <Grid item xs={12} md={6}>
      <Stack spacing={2}>
        <br />
        <br />
        <br />
        <br />
        <Button
          variant="contained"
          component="label"
        >
          Seleccionar imagen
          <input
            type="file"
            hidden
            id="nombre"
            name="nombre"
            onChange={handleImagenChange}
          />
        </Button>
        <br />
        <Grid item xs={12} md={12}>
          <center>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubirImagen}
            >
              Enviar
            </Button>
          </center>
        </Grid>

        {mensaje && (
          <Typography color="success">
            {mensaje}
          </Typography>
        )}
      </Stack>
    </Grid>
  );
};

export default Imagenes;