import clsx from 'clsx';

import { IQuestion, EQuestionType } from '@shared';

import styles from './styles.module.scss';
import React, { useState } from 'react';

interface IProps {
	className?: string;
	data: IQuestion;
	children?: React.ReactNode;
	onChange: () => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const Question = (props: IProps) => {
	const {
		data: { title, type, options = [] },
		className,
		children,
		onChange,
	} = props;
	const [value, updateValue] = useState(() => ({
		options: Object.fromEntries(options.map((o, ndx) => [ndx, false])),
		value: '',
	}));

	const handleOption = (ndx: number) => {
		if (type === EQuestionType.single) {
			updateValue({
				...value,
				options: {
					...Object.fromEntries(options.map((o, ndx) => [ndx, false])),
					[ndx]: true,
				},
			});
		}

		if (type === EQuestionType.multi) {
			updateValue({
				...value,
				options: {
					...value.options,
					[ndx]: !value.options[ndx],
				},
			});
		}
	};

	return (
		<div className={clsx(styles.question, className)}>
			<div className={styles.questionTitle}>{title}</div>

			<div className={styles.questionContent}>
				{(type === EQuestionType.multi || type === EQuestionType.single) && (
					<div className={clsx(styles.optionList)}>
						{options.map((it, ndx) => {
							const isActive = value.options[ndx];
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
									<div className={clsx(styles.optionValue)}>{mark}</div>
								</button>
							);
						})}
					</div>
				)}

				{type === EQuestionType.number && <input type="number" />}

				{type === EQuestionType.text && <input type="text" />}
			</div>

			{children}
		</div>
	);
};
