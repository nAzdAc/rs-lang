import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const StatsBarChart = ({ data }) => {
	const { theme } = useSelector((state) => state.settings);
	const color1 = useMemo(() => (theme === 'dark' ? '#141414' : '#F2F2F2'), [ theme ]);
	const color2 = useMemo(() => (theme === 'dark' ? '#FCCA81' : '#BB86FC'), [ theme ]);
	const backgroundColor = useMemo(() => (theme === 'dark' ? '#E38600' : '#5600E8'), [ theme ]);
	return (
		data &&
		data.length && (
			<div style={{ width: '100%', fontFamily: 'inherit' }}>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart stroke={color1} fill={backgroundColor} data={data}>
						<XAxis dataKey={'date'} stroke={backgroundColor} />
						<YAxis stroke={backgroundColor} />
						<Tooltip
							contentStyle={{
								backgroundColor: color1,
								border: `3px solid ${color2}`,
								borderRadius: '5px',
								fontFamily: 'inherit'
							}}
							cursor={{ stroke: backgroundColor, strokeWidth: 2, fill: color2 }}
						/>
						<CartesianGrid stroke={backgroundColor} strokeDasharray="3 3" />
						<Bar
							label={{ fill: color1, fontSize: 20, fontWeight: 'bold', fontFamily: 'inherit' }}
							dataKey={'words'}
							fill={backgroundColor}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		)
	);
};
