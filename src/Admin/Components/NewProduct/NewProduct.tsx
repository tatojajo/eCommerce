import { SetStateAction, useState } from 'react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Add, ArrowLeft, ArrowRight, Publish } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Autocomplete, IconButton, Link, Typography } from '@mui/material';
import { categories } from '../../../component/Header/categories';
import { useAppSelector } from '../../../redux/hooks';
import { addNewProduct } from '../../helpers/products';

const productValidationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  brand: yup.string().required('brand is required'),
  // categories: yup
  //   .array()
  //   .min(1, 'Please select at least one category')
  //   .required('Categories are required'),
  price: yup.string().required('Price is required'),
  amount: yup.string().required('Amount is required')
  // images: yup.string().required('Images are required')
});

const NewProduct = () => {
  const { t } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [imageValue, setImageValue] = useState<string>('');
  const { brands } = useAppSelector<AdminState>((state) => state.adminReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ProductItem>({
    resolver: yupResolver(productValidationSchema)
  });

  const onSubmit: SubmitHandler<ProductItem> = async (product) => {
    const updatedProduct = {
      ...product,
      categories: selectedCategories,
      images: productImages
    };
    try {
      const { data } = await addNewProduct(updatedProduct);

      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setValue('brand', '');
      setProductImages([]);
      reset();
      setSelectedCategories([]);
    }
  };

  const handleCategoryChange = (event: any, value: any) => {
    setSelectedCategories(value);
  };
  const handleImages = (event: any) => {
    setImageValue(event.target.value);
  };

  const addImage = () => {
    setImageValue('');
    setProductImages((prev) => [...prev, imageValue]);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Autocomplete
            multiple={false}
            options={brands}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Brands" />}
            onChange={(e, value: any) => {
              setValue('brand', value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Title"
            {...register('title')}
            helperText={errors.title?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Price"
            {...register('price')}
            helperText={errors.price?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Amount"
            {...register('amount')}
            helperText={errors.amount?.message}
          />
        </Grid>

        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Images"
            onChange={handleImages}
            value={imageValue}
            helperText={errors.images?.message}
            InputProps={{
              endAdornment: (
                <IconButton onClick={addImage}>
                  <Add />
                </IconButton>
              )
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            multiline
            rows={3}
            fullWidth
            label="Description"
            {...register('description')}
            helperText={errors.description?.message}
          />
        </Grid>
        {productImages.length > 0 &&
          productImages.map((image, index) => {
            return (
              <Typography
                sx={{ padding: '15px', display: 'flex', alignItems: 'center' }}
                variant="h4Montserrat"
                color="initial">
                image N: {index + 1} <ArrowRight /> <Link>{image}</Link>
              </Typography>
            );
          })}
        <Grid item xs={12} mt={3}>
          <Button type="submit" fullWidth variant="contained" color="success">
            {t('global.publish')}
            <Publish />
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewProduct;
