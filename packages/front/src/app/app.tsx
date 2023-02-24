import { useEffect, useState } from 'react';
import { IQuiz } from '@shared';

import { api } from '../utils';

import { Quiz } from './components';
import './global.scss';

export default function App() {
	const [data, updateData] = useState<IQuiz[]>();

	const fetchQuiz = async () => {
		try {
			const list = await api.findQuizes();

			updateData(list);
		} catch (err) {
			console.error(err);
			updateData([]);
		}
	};
	useEffect(() => {
		fetchQuiz();
	}, []);

	if (!data) {
		return <>Loading...</>;
	}

	if (data.length === 0) {
		return <>Data not found...</>;
	}

	return <Quiz data={data[0]} />;
}
