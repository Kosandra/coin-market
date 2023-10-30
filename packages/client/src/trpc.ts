import { createTRPCProxyClient, httpLink } from '@trpc/client';
import { AppRouter } from 'server/api';

// @ts-ignore
export const client = createTRPCProxyClient<AppRouter>({
	links: [
		httpLink({
			url: 'http://localhost:3030/trpc',
		}),
	],
});
