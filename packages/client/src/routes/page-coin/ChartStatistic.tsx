import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styles from './styles.module.scss';
import {
	AgChartThemeOverrides,
	ChartToolPanelsDef,
	ColDef,
	CreateRangeChartParams,
} from 'ag-grid-community';
import { fixNumber } from '../../assets/utils/functions';
import ModeChartTitle from './ModeChartTitle';
import { modeChartStatisticCoin } from '../../assets/utils/constants';
import { IHistoryDataItem } from 'models/IHistoryDataItem';
import { useAppSelector } from '../../redux/hooks';
import { IModeChartCoin } from 'models/ModeChartCoin';

function formatTime(date: Date | number) {
	try {
		return Intl.DateTimeFormat('en-GB', {
			day: '2-digit',
			month: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		}).format(new Date(date));
	} catch (e: any) { //cannot specify a data type
		console.log(e.message);
	}
	return '';
}

type Props ={
	topping: IModeChartCoin,
	onChangeMode: (e: ChangeEvent<HTMLInputElement>)=>void
}

const ChartStatistic = (props: Props) => {
	const {topping, onChangeMode} = props;
	const gridRef = useRef<AgGridReact>(null);
	const [coinHistory, setCoinHistory] = useState<IHistoryDataItem[]>([]);
	// const [topping, setTopping] = useState(modeChartStatisticCoin[0].value);
	const [rowData, setRowData] = useState<any[]>([]); //cannot specify a data type
	const coinHistorySelector = useAppSelector(state => state.coinsAll.currentCoinHistory);
	const columnDefs: ColDef[] = [
		{ field: 'time', chartDataType: 'time' },
		{ field: 'priceUsd' },
	];

	const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
	const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
	const defaultColDef = useMemo<ColDef>(() => {
		return {
			flex: 1,
			resizable: true,
		};
	}, []);

	const popupParent = useMemo<HTMLElement | null>(() => {
		return document.body;
	}, []);

	const chartThemeOverrides = useMemo<AgChartThemeOverrides>(() => {
		return {
			line: {
				navigator: {
					enabled: true,
					height: 20,
					margin: 25,
				},
				axes: {
					time: {
						label: {
							rotation: 0,
							format: '%d.%m.%y\n(%H:%M)',
						},
					},
					number: {
						label: {
							formatter: (params) => {
								return '$' + params.value.toLocaleString();
							},
						},
					},
				},
				series: {
					tooltip: {
						renderer: ({ xValue, yValue }) => {
							let xVal = xValue instanceof Date ? xValue : new Date(xValue);
							return {
								content: `${formatTime(xVal)}: $${yValue}`,
							};
						},
					},
				},
			},
		};
	}, []);

	const chartToolPanelsDef = useMemo<ChartToolPanelsDef>(() => {
		return {
			panels: ['data', 'format'],
		};
	}, []);

	const onFirstDataRendered = useCallback(() => {
		const createRangeChartParams: CreateRangeChartParams = {
			chartContainer: document.querySelector('#myChart') as HTMLElement,
			suppressChartRanges: true,
			cellRange: {
				columns: ['time', 'priceUsd'],
			},
			chartType: 'line',
		};
		gridRef.current!.api.createRangeChart(createRangeChartParams);
	}, []);

	useEffect(() => {
		if (coinHistorySelector) {
			if (topping) {
				setCoinHistory([...coinHistorySelector].reverse());
			} else {
				setCoinHistory([...coinHistorySelector]);
			}
		}
	}, [topping, coinHistorySelector]);

	useEffect(() => {
		setRowData(getRowData);
	}, [coinHistory]);

	// const onOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	const value = e.target.value;
	//
	// 	setTopping(value);
	// };

	const getCountPointsTopping = () => {
		if (!topping) return 10;
		const modePoints = modeChartStatisticCoin.find(mode => mode.value === topping.value)?.points;
		if (modePoints)
			return modePoints;
		return 10;
	};

	function getRowData() {
		if (!coinHistory) return [];
		const historyArray = [...coinHistory];
		const array: any[] = []; //cannot specify a data type
		historyArray?.map((el, key) => {
			if (key < getCountPointsTopping()) {
				array.push({ time: el?.time, priceUsd: fixNumber(el.priceUsd, true) });
			}
		});
		return array;
	}

	return (
		<div style={containerStyle}>

			<div className={styles.time_period_group}>
                <span className={styles.param_name}>
                    Select a time period
                </span>

				<div className={styles.radio_btns}>
					{modeChartStatisticCoin.map((mode, key) =>
						<ModeChartTitle
							valueInput={mode.value}
							textLabel={mode.title}
							checkedInput={topping.value}
							onChange={onChangeMode}
							key={key}
						/>,
					)}
				</div>
			</div>

			<div className={`${styles.wrapper}`}>
				{topping && rowData.length > 0 ?
					<>
						<div style={gridStyle}>
							<AgGridReact
								ref={gridRef}
								rowData={rowData}
								columnDefs={columnDefs}
								defaultColDef={defaultColDef}
								popupParent={popupParent}
								enableRangeSelection={true}
								enableCharts={true}
								chartThemeOverrides={chartThemeOverrides}
								chartToolPanelsDef={chartToolPanelsDef}
								onFirstDataRendered={onFirstDataRendered}
							/>
						</div>
						<div
							id='myChart'
							className={`ag-theme-alpine ${styles.myChart}`}
						/>
					</>
					: <div>Loading...</div>
				}
			</div>
		</div>
	);
};

export default ChartStatistic;
