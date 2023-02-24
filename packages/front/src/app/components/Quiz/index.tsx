import clsx from 'clsx';
import { useState } from 'react';

import { TAnswer, ResultDto, IWizard } from '@shared';

import { Question, Result, Starter } from '../';

import styles from './styles.module.scss';

interface IProps {
	data: IWizard;
}
export function Quiz(props: IProps) {
	const { data } = props;
	const { title, description, questions } = data;

	const [answers, updateAnswers] = useState<ResultDto>(ResultDto.init(questions));
	const [activeIndex, setActiveIndex] = useState(-1);

	const handlePrev = () => setActiveIndex(activeIndex - 1);
	const handleNext = () => setActiveIndex(activeIndex + 1);
	const handleStart = (restart: boolean) => {
		updateAnswers(ResultDto.init(questions));
		setActiveIndex(restart ? -1 : 0);
	};

	const handleAnswer = (index: number, answer: TAnswer) => {
		const curAnswers = [...answers.data];
		curAnswers[index] = answer;

		updateAnswers({
			...answers,
			data: curAnswers,
		});
	};

	const isStart = activeIndex < 0;
	const isProgress = !isStart && activeIndex < questions.length;

	return (
		<div className={styles.quiz}>
			{activeIndex < 0 && <Starter title={title} description={description} onStart={() => handleStart(false)} />}

			{isProgress && (
				<>
					<div className={styles.quizStep}>
						{activeIndex + 1}/{questions.length}
					</div>

					<div className={styles.questions}>
						{questions.map((it, index) => {
							const curAnswer = answers.data[activeIndex];
							const isDisabledNext = curAnswer.length === 0;

							return (
								<Question
									key={it.title}
									className={clsx(styles.question, {
										[styles.question_active]: activeIndex === index,
									})}
									data={it}
									answer={curAnswer}
									onChange={(value) => handleAnswer(index, value)}
								>
									<div className={styles.questionsNav}>
										<button onClick={handlePrev}>{activeIndex === 0 ? '🏠 Home' : 'Prev'}</button>
										<button disabled={isDisabledNext} onClick={handleNext}>
											{activeIndex + 1 === questions.length ? '🏁 Finish' : 'Next'}
										</button>
									</div>
								</Question>
							);
						})}
					</div>
				</>
			)}

			{activeIndex === questions.length && (
				<Result wizard={data} data={answers} onRestart={() => handleStart(true)} />
			)}
		</div>
	);
}
