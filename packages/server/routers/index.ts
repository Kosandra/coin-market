import { t } from "../trpc";
import { z } from "zod";
import axios from "axios";
import { ICoin } from "client/src/types/models/ICoin";
import { COINS_API } from "client/src/assets/utils/links";
import { IHistoryDataItem } from "client/src/types/models/IHistoryDataItem";

const coinIdProcedure = t.procedure.input(z.object({ coinId: z.string() }));
const coinLimitProcedure = t.procedure.input(
  z.object({ limit: z.number(), offset: z.number() }),
);
const coinHistoryProcedure = coinIdProcedure.input(
  z.object({ interval: z.string() }),
);

type DataAllCoins = {
  data: ICoin[];
  timestamp: number;
};

type DataCoinById = {
  data: ICoin;
  timestamp: number;
};

type DataHistory = {
  data: IHistoryDataItem[];
  timestamp: number;
};
export const appRouter = t.router({
  getCoinsApi: coinLimitProcedure.query<ICoin[]>(async ({ input }) => {
    const request = await axios.get<DataAllCoins>(COINS_API, { params: input });
    return request?.data.data;
  }),

  getCoinByIdApi: coinIdProcedure.query<ICoin>(async ({ input }) => {
    const request = await axios.get<DataCoinById>(
      `${COINS_API}/${input.coinId}`,
    );
    return request?.data.data;
  }),

  getCoinHistoryApi: coinHistoryProcedure.query<IHistoryDataItem[]>(
    async ({ input }) => {
      const request = await axios.get<DataHistory>(
        `${COINS_API}/${input.coinId}/history`,
        {
          params: {
            interval: input.interval,
          },
        },
      );
      return request?.data.data;
    },
  ),
});
