import { createTRPCProxyClient, httpLink } from '@trpc/client';
import { AppRouter } from 'server/api';
import {SERVER_API} from "./assets/utils/links";

// @ts-ignore
export const client = createTRPCProxyClient<AppRouter>({
	links: [
		httpLink({
			url: SERVER_API,
		}),
	],
});
