import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { IQuestion, EQuestionType, IResult } from '@shared';

import styles from './styles.module.scss';

interface IProps {
	className?: string;
	data: IQuestion;
	children?: React.ReactNode;
	onChange: (result: Omit<IResult, 'index'>) => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const Question = (props: IProps) => {
	const {
		data: { title, type, options = [] },
		className,
		children,
		onChange,
	} = props;
	const [result, updateResult] = useState(() => ({
		options: Object.fromEntries(options.map((o, ndx) => [ndx, false])),
		input: '',
	}));

	const handleOption = (ndx: number) => {
		if (type === EQuestionType.single) {
			updateResult({
				...result,
				options: {
					...Object.fromEntries(options.map((o, ndx) => [ndx, false])),
					[ndx]: true,
				},
			});
		}

		if (type === EQuestionType.multi) {
			updateResult({
				...result,
				options: {
					...result.options,
					[ndx]: !result.options[ndx],
				},
			});
		}
	};

	const handleChange = (input: string) => {
		updateResult({
			...result,
			input,
		});
	};

	useEffect(() => {
		const activeOptions: number[] = [];
		Object.entries(result.options).forEach(([index, isActive]) => {
			if (isActive) {
				activeOptions.push(Number(index));
			}
		});

		onChange({
			input: result.input,
			options: activeOptions,
		});
	}, [result]);

	return (
		<div className={clsx(styles.question, className)}>
			<div className={styles.questionTitle}>{title}</div>

			<div className={styles.questionContent}>
				{(type === EQuestionType.multi || type === EQuestionType.single) && (
					<div className={clsx(styles.optionList)}>
						{options.map((it, ndx) => {
							const isActive = result.options[ndx];
							let mark = '';
							if (type === EQuestionType.single) {
								mark = isActive ? '✔️' : '🔘';
							}
							if (type === EQuestionType.multi) {
								mark = isActive ? '✔️' : '🔲';
							}

							return (
								<button
									key={it.title}
									className={clsx(styles.option)}
									onClick={() => handleOption(ndx)}
								>
									{ALPHABET[ndx]}. {it.title}
									<span>{mark}</span>
								</button>
							);
						})}
					</div>
				)}

				{type === EQuestionType.number && (
					<input type="number" value={result.input} onChange={(e) => handleChange(e.target.value)} />
				)}

				{type === EQuestionType.text && (
					<textarea value={result.input} onChange={(e) => handleChange(e.target.value)} />
				)}
			</div>

			{children}
		</div>
	);
};
