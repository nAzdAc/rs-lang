import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
	pieChartContainer: {
		width: '450px',
		height: '300px',
		overflow: 'hidden'
	}
});

const renderActiveShape = (props) => {
	// console.log(props);
	const RADIAN = Math.PI / 180;
	const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + outerRadius * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? 'start' : 'end';
	return (
		<g>
			<text fontWeight="bold" fontSize="13px" x={cx} y={cy - 40} dy={8} textAnchor="middle" fill={fill}>
				Нажми,
			</text>
			<text fontWeight="bold" fontSize="13px" x={cx} y={cy - 20} dy={8} textAnchor="middle" fill={fill}>
				чтобы
			</text>
			<text fontWeight="bold" fontSize="13px" x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
				увидеть
			</text>
			<text fontWeight="bold" fontSize="13px" x={cx} y={cy + 20} dy={8} textAnchor="middle" fill={fill}>
				подробности
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle + 3}
				endAngle={endAngle - 3}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle + 3}
				endAngle={endAngle - 3}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
			<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 5}
				y={ey}
				textAnchor={textAnchor}
				fill={fill}
				fontSize="13px"
			>{`${payload.name} ${value}/${value / percent}`}</text>
			<text fontSize="13px" x={ex + (cos >= 0 ? 1 : -1) * 5} y={ey} dy={18} textAnchor={textAnchor} fill={fill}>
				{`( ${(percent * 100).toFixed(2)}% )`}
			</text>
		</g>
	);
};

export const GamePieChart = ({ data, all, showAddStats }) => {
	const [ activeIndex, setActiveIndex ] = useState(0);
	const { theme } = useSelector((state) => state.settings);

	useEffect(
		() => {
			console.log(data);
			console.log(all);
		},
		[ data, all ]
	);

	const onPieEnter = (_, index) => {
		setActiveIndex(index);
	};

	const classes = useStyles();
	return (
		<div className={classes.pieChartContainer}>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						activeIndex={activeIndex}
						activeShape={renderActiveShape}
						data={data}
						cx="50%"
						cy="50%"
						innerRadius={60}
						outerRadius={80}
						fill={theme === 'dark' ? '#E38600' : '#5600E8'}
						dataKey="value"
						onMouseEnter={onPieEnter}
						onClick={showAddStats}
						name={all}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};
