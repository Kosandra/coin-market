import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { router } from './routes';
import { PersistGate } from 'redux-persist/integration/react';
import TextWriper from './components/text-wriper/TextWriper';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate
				persistor={persistor}
				loading={<TextWriper text={'Loading persistor...'} delayValue={500} />}
			>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</React.StrictMode>,
);
