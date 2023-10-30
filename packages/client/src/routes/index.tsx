import React, { createBrowserRouter } from 'react-router-dom';
import PageCoin from './page-coin';
import PageCoinsTable from './page-coins-table';
import PageNotFound from './page-not-found';

export const router = createBrowserRouter([

	{
		path: 'coins/:id',
		element: <PageCoin />,
	},
	{
		path: '/',
		element: <PageCoinsTable />,
	},
	{
		path: '*',
		element: <PageNotFound />,
	},
], {
	basename: '/',
});
