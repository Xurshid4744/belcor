import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useDispatch } from "@/store/store";
import { openSnackbar } from "@/store/slices/snackbar";
import { useLoginMutation } from "@/store/endpoints/login";
import { login } from "@/store/slices/user";

interface FormValues {
  email: string;
  password: string;
}
const Login: React.FC = () => {
  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      email: "eve.holt@reqres.in",
      password: "12345",
    },
  });
  const dispatch = useDispatch();
  const [loginMutation, { isLoading: loginLoading }] = useLoginMutation();

  const onSubmit = async (data: FormValues) => {
    const loginValues = {
      email: data.email,
      password: data.password,
    };
    try {
      const result = await loginMutation(loginValues).unwrap();
      dispatch(login({ token: result.token}));
      dispatch(openSnackbar({ open: true, message: "You have successfully logged in !"}));
    } catch (error: any) {
      dispatch(openSnackbar({open: true,message: "Failed to login:" + error.data.error}));
    }
  };
  return (
    <Container
      component="section"
      sx={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            mt: 3,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Email Address"
            {...register("email", { required: true })}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Password"
            type="password"
            {...register("password", { required: true })}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            {loginLoading ? `Logging in...` : `Login`}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
