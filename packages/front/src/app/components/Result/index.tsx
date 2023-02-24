import { useEffect, useState } from 'react';

import { IWizard, ResultDto, ResultResponseDto } from '@shared';

import { api } from '../../../utils';

import styles from './styles.module.scss';

interface IProps {
	wizard: IWizard;
	data: ResultDto;
	onRestart: () => void;
}
export const Result = (props: IProps) => {
	const { wizard, data, onRestart } = props;
	const [result, updateResult] = useState<ResultResponseDto>();

	const fetchResult = async () => {
		try {
			const result = await api.sendResult(wizard.id ?? '', data);

			updateResult(result);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchResult();
	}, []);

	return (
		<div className={styles.result}>
			{result ? (
				<>
					{result.success && <h1>Gongrats🎉</h1>}
					<strong>Your score: {Math.floor(result.score * 100)}</strong>
					<button onClick={onRestart}>Restart</button>
				</>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	);
};
