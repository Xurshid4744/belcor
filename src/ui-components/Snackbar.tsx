import IconButton from "@mui/material/IconButton";
import MuiSnackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "@/store/store";
import { closeSnackbar } from "@/store/slices/snackbar";

const Snackbar = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state: any) => state.snackbar);
  const { anchorOrigin, message, open } = snackbar;

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <>
      <MuiSnackbar
        anchorOrigin={anchorOrigin}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
              sx={{ mt: 0.25 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
};

export default Snackbar;
