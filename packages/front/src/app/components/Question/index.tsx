import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { IQuestion, EQuestionType, TAnswer } from '@shared';

import styles from './styles.module.scss';

interface IProps {
	data: IQuestion;
	answer: TAnswer;
	onChange: (answer: TAnswer) => void;
	className?: string;
	children?: React.ReactNode;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const Question = (props: IProps) => {
	const {
		data: { title, type, options = [] },
		className,
		children,
		answer,
		onChange,
	} = props;

	const handleOption = (optionIndex: number) => {
		if (Array.isArray(answer)) {
			if (type === EQuestionType.single) {
				onChange([optionIndex]);
			}

			if (type === EQuestionType.multi) {
				onChange(
					answer.includes(optionIndex) ? answer.filter((it) => it !== optionIndex) : [...answer, optionIndex]
				);
			}
		}
	};

	return (
		<div className={clsx(styles.question, className)}>
			<div className={styles.questionTitle}>{title}</div>

			<div className={styles.questionContent}>
				{(type === EQuestionType.multi || type === EQuestionType.single) && (
					<div className={clsx(styles.optionList)}>
						{options.map((it, ndx) => {
							const isActive = (answer as number[]).includes(ndx);
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
					<input type="number" value={answer as string} onChange={(e) => onChange(e.target.value)} />
				)}

				{type === EQuestionType.text && (
					<textarea value={answer as string} onChange={(e) => onChange(e.target.value)} />
				)}
			</div>

			{children}
		</div>
	);
};
