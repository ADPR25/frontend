import { Grid,Stack,InputLabel,OutlinedInput } from "@mui/material";

const Imagenes = () => {
    return (
        <>
             <Grid item xs={12} md={6}>
            <Stack spacing={0}>
              <InputLabel htmlFor="nombre">Nombre</InputLabel>
              <OutlinedInput
                id="nombre"
                type="file"
                name="nombre"
                fullWidth
                style={{ width: '100%' }}
              />
            </Stack>
          </Grid>
        </>
    );
};

export default Imagenes;
