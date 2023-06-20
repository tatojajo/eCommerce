import { FC, useEffect, useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { deleteProduct } from '../../../helpers/products';

type DeleteProductProps = {
  confirmDelete: boolean;
  setConfirmDelete: Function;
  product: ProductItem | null;
};

const DeleteProduct: FC<DeleteProductProps> = ({ confirmDelete, setConfirmDelete, product }) => {
  const [lastConfirmation, setLastConfirmation] = useState<boolean>(false);
  console.log(product);
  const handelClose = () => {
    setConfirmDelete(false);
  };

  useEffect(() => {
    try {
      if (lastConfirmation) {
        const deleteConfirmation = async () => {
          const { data } = await deleteProduct(product);
          if (data) {
            setLastConfirmation(false);
            setConfirmDelete((prev: boolean) => !prev);
          }
        };
        deleteConfirmation();
      }
    } catch (error) {
      console.log(error);
    }
  }, [lastConfirmation, product]);
  return (
    <Dialog open={confirmDelete} onClose={handelClose}>
      <DialogTitle> Are you sure you want to delete</DialogTitle>
      <DialogContent>
        <DialogContentText>{product!.title}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handelClose}>Cancel</Button>
        <Button
          color="warning"
          onClick={() => {
            setLastConfirmation(true);
          }}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProduct;
