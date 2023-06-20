import { useNavigate, useLocation } from 'react-router-dom';
import { Breadcrumbs, Typography, Link } from '@mui/material';
import { Padding } from '@mui/icons-material';
const BreadCrumbs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pathnames = pathname.split('/').filter((x) => x);
  return (
    <Breadcrumbs sx={{ marginTop: '0', height: '35px', bgcolor: 'lightgray', pl: 2 }}>
      {pathnames.length > 0 ? (
        <Link onClick={() => navigate('/')}>Home</Link>
      ) : (
        <Typography> Home </Typography>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('>')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={name}>{name}</Typography>
        ) : (
          <Link key={name} onClick={() => navigate(routeTo)}>
            {name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
