import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const Chart = ({ data }) => {
	return (
		data &&
		data.length && (
			<div style={{ width: '100%' }}>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart fill="#5600E8" data={data}>
						<XAxis dataKey={'date'} stroke="#5600E8" />
						<YAxis stroke="#5600E8" />
						<Tooltip stroke="#5600E8" />
						<CartesianGrid stroke="#5600E8" strokeDasharray="3 3" />
						<Bar label={{ fill: '#F2F2F2', fontSize: 20, fontWeight: 'bold' }} dataKey={'words'} fill="#5600E8" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		)
	);
};
