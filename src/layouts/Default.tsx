import { Grid } from '@mui/material';
import React from 'react';
import HeaderMenu from '../components/Header';
import AppBar from '../components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

function DefaultLayout(props: LayoutProps) {
  return <Grid>{props.children}</Grid>;
}

export default DefaultLayout;
