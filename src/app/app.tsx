import clsx from 'clsx';
import { useState } from 'react';

import { MOCK } from '@shared';

import styles from './app.module.scss';
import { Question, Result, Starter } from './components';
import './global.scss';

export default function App() {
	const data = MOCK;
	const { title, description, questions } = data;
	const [activeIndex, setActiveIndex] = useState(-1);
	const handlePrev = () => setActiveIndex(activeIndex - 1);
	const handleNext = () => setActiveIndex(activeIndex + 1);
	const handleRestart = () => {
		setActiveIndex(-1);
	};
	const handleStart = () => {
		setActiveIndex(0);
	};
	const handleChange = () => {};

	const isStart = activeIndex < 0;
	const isProgress = !isStart && activeIndex < questions.length;

	return (
		<div className={styles.app}>
			{activeIndex < 0 && <Starter title={title} description={description} onStart={handleStart} />}

			{isProgress && (
				<>
					<div className={styles.appStep}>
						{activeIndex + 1}/{questions.length}
					</div>

					<div className={styles.questions}>
						{questions.map((it, index) => (
							<Question
								key={it.title}
								className={clsx(styles.question, { [styles.question_active]: activeIndex === index })}
								data={it}
								onChange={handleChange}
							>
								<div className={styles.questionsNav}>
									<button onClick={handlePrev}>Prev</button>
									<button onClick={handleNext}>Next</button>
								</div>
							</Question>
						))}
					</div>
				</>
			)}

			{activeIndex === questions.length && <Result onRestart={handleRestart} />}
		</div>
	);
}
