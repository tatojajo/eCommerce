import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import "yup-phone";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

type RegistracionProps = {
  open: boolean;
  setOpen: Function;
};

const registerValidationSchema = yup.object().shape({
  firstName: yup.string().required("Firstname is required"),
  lastName: yup.string().required("Lastname is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  phoneNumber: yup
    .string()
    .phone("Invalid Mobile Number")
    .required("mobile reuired"),
  password: yup
    .string()
    .required("Password Is Required")
    .min(5, "Password length should be at least 6 characters")
    .max(12, "Password length cannot exceed more than 12 characters"),
});

const Register: FC<RegistracionProps> = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterInitialValue>({
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit: SubmitHandler<RegisterInitialValue> = async (user) => {
    console.log(user)
    try {
      const { data } = await registerUser(user);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ marginTop: "0px" }}>
      <Dialog
        maxWidth="sm"
        style={{ marginTop: "60px" }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle> {t("global.create_T-shop_Account")}</DialogTitle>
        <DialogContent>
          <form style={{ marginTop: "10px" }} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  helperText={errors.firstName?.message}
                  id="firstName"
                  label={t("global.firstName")}
                  {...register("firstName")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  helperText={errors.lastName?.message}
                  label={t("global.lastName")}
                  {...register("lastName")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  helperText={errors.phoneNumber?.message}
                  label={t("global.phone")}
                  {...register("phoneNumber")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  helperText={errors.email?.message}
                  label={t("global.email")}
                  {...register("email")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="password"
                  helperText={errors.password?.message}
                  label={t("global.password")}
                  {...register("password")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled
                  fullWidth
                  id="confirmPassword"
                  label={t("global.confirm_password")}
                  // {...register("confirmPassword")}
                />
              </Grid>
              <Grid item xs={12} mt={3}>
                <Button
                  fullWidth
                  type="submit"
                  variant="outlined"
                  color="secondary"
                >
                  {t("global.submit")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Register;
