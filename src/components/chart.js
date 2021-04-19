import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function Chart({ data }) {
	return (
		data &&
		data.length && (
			<div style={{ width: '100%', height: 300 }}>
				<ResponsiveContainer>
					<BarChart data={data}>
						<XAxis dataKey={'date'} />
						<YAxis />
						<Tooltip />
						<Bar dataKey={'words'} fill="#01A299" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		)
	);
}
