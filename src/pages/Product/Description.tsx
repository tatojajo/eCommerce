import React, { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Paper,
  DialogActions,
  Button
} from '@mui/material';
import { t } from 'i18next';

type ProductDetailsProps = {
  isDescriptionOpen: boolean;
  handleCloseDetails: () => void;
  selectedProduct: CartProductItem | null;
};

const Description: FC<ProductDetailsProps> = ({
  isDescriptionOpen,
  handleCloseDetails,
  selectedProduct
}) => {
  return (
    <Dialog open={isDescriptionOpen} onClose={handleCloseDetails}>
      <DialogTitle>
        <Typography variant='h4Montserrat' color="initial">
          {t('global.details')}:
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Paper elevation={5} sx={{ padding: '20px', marginTop: '10px' }}>
          {selectedProduct?.description}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDetails}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Description;
