import React from 'react';
import Alert from '../../components/Alert';
import { NextPageWithLayout } from '../_app';

const component : NextPageWithLayout = () => <Alert />;

component.getLayout = (page) => page;

export default component;
