import {  Router } from 'express';
import authRoute from './auth'; 

const route = Router(); 

route.use('/auth', authRoute);	 

export default route;
