import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Autocomplete
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { addNewImage, saveBrands } from '../../../Redux/action';
import { editProductInfo, getAllBrands } from '../../../helpers/products';
import { categories } from '../../../../component/Header/categories';
type EditProductProdps = {
  isEditingOpen: boolean;
  setIsEditingOpen: Dispatch<SetStateAction<boolean>>;
};

const editableproductState: ProductItem = {
  id: '',
  title: '',
  description: '',
  images: [],
  brand: '',
  categories: [],
  price: '',
  rating: '',
  amount: ''
};

const productValidationSchema = yup.object().shape({
  id: yup.string().required('Id is required'),
  title: yup.string().required('title is required'),
  description: yup.string().required('description is required'),
  brand: yup.string().required('brand is required'),
  // categories: yup.string().required('categories is required'),
  price: yup.string().required('price is required'),
  rating: yup.string().required('rating is required'),
  amount: yup.string().required('amount is required')
});
const EditProduct: FC<EditProductProdps> = ({ isEditingOpen, setIsEditingOpen }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newImage, setNewImage] = useState<string>('');
  const [addingImage, setAddingImage] = useState<boolean>(false);
  const { editabeProduct, brands } = useAppSelector<AdminState>((state) => state.adminReducer);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ProductItem>({
    resolver: yupResolver(productValidationSchema)
  });

  const onSubmit: SubmitHandler<ProductItem> = async (product) => {
    const updatedProduct = {
      ...product,
      categories: selectedCategories
    };
    try {
      const { data } = await editProductInfo(updatedProduct);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditingOpen(false);
    }
  };
  const handleCloseEditing = () => {
    setIsEditingOpen(false);
  };

  const handleAddNewImage = () => {
    setAddingImage((prev) => !prev);
  };

  const handleCategoryChange = (event: any, value: any) => {
    setSelectedCategories(value);
  };

  useEffect(() => {
    const getBrands = async () => {
      const { data } = await getAllBrands();
      dispatch(saveBrands(data.brands));
    };
    getBrands();
    setValue('id', editabeProduct!.id);
    setValue('title', editabeProduct!.title);
    setValue('description', editabeProduct!.description);
    setValue('brand', editabeProduct!.brand);
    setSelectedCategories(editabeProduct!.categories);
    setValue('price', editabeProduct!.price);
    setValue('rating', editabeProduct!.rating);
    setValue('amount', editabeProduct!.amount);
    setValue('images', editabeProduct!.images);
  }, [editabeProduct, setValue, isEditingOpen]);

  return (
    <Dialog open={isEditingOpen} onClose={handleCloseEditing} fullWidth={true} maxWidth={'xl'}>
      <DialogTitle>Editing Product With ID {editabeProduct!.id}</DialogTitle>
      <DialogContent>
        <form style={{ display: 'flex' }}>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="ID" {...register('id')} />{' '}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple={false}
                options={brands}
                fullWidth
                value={editabeProduct!.brand}
                onChange={(event, value: any) => setValue('brand', value)}
                renderInput={(params) => <TextField {...params} label="Brands" />}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth label="Title" {...register('title')} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                multiple
                options={categories}
                fullWidth
                renderInput={(params) => <TextField {...params} label="Categories" />}
                value={selectedCategories}
                onChange={handleCategoryChange}
              />
              {errors.categories && <span>{errors.categories.message}</span>}
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Price" {...register('price')} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Rating" {...register('rating')} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Amount" {...register('amount')} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                multiline={true}
                rows={5}
                label="Description"
                {...register('description')}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ overflowY: 'auto', padding: '20px', maxHeight: '400px' }}>
            {editabeProduct!.images.map((image: string, index: number) => {
              return (
                <Grid key={index} item xs={6} sm={12}>
                  image N `${index}`
                  <Typography variant="subtitle1" color="black">
                    {image}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </form>
        {addingImage && (
          <Box
            sx={{
              display: 'flex',
              gap: '20px',
              padding: '15px'
            }}>
            <TextField
              fullWidth
              label="New Image URL"
              onChange={(e) => setNewImage(e.target.value)}
            />
            <Button
              variant="outlined"
              sx={{ width: '200px' }}
              onClick={() => {
                dispatch(addNewImage(newImage));
                handleAddNewImage();
              }}>
              Save
            </Button>
          </Box>
        )}
        <DialogActions>
          {!addingImage && (
            <Button variant="outlined" onClick={() => setAddingImage(true)}>
              Add New Image
            </Button>
          )}
          <Button onClick={() => handleSubmit(onSubmit)()} variant="outlined" color="secondary">
            {t('global.submit')}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
