import clsx from 'clsx';
import { useState } from 'react';

import styles from './app.module.scss';
import { Question } from './components';
import './global.scss';

export enum EQuestionType {
	/** single-choice question */
	single = 'single',
	/** multi-choice question */
	multi = 'multi',
	/** text input question */
	text = 'text',
	/** number input quesion */
	number = 'number',
}

export interface IQuestion {
	title: string;
	type?: EQuestionType;
	options?: {
		title: string;
	};
}

export interface IWizard {
	title: string;
	description: string;
	questions: IQuestion[];
}

const MOCK: IWizard = {
	title: '',
	description: '',
	questions: [
		{ title: "Let's start by having a quick look in the mirror: how's your complexion?" },
		{ title: 'And how would you describe your pores?' },
		{ title: 'Does your skin get red much?' },
		{ title: 'Do you get breakouts and what are they like?' },
		{ title: 'What does your skin feel like after moisturizing?' },
	],
};

export default function App() {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className={styles.app}>
			<div className={styles.questions}>
				{MOCK.questions.map((step, index) => (
					<Question
						key={step.title}
						className={clsx(styles.question, { [styles.question_active]: activeIndex === index })}
						title={step.title}
						onNext={() => setActiveIndex(activeIndex + 1)}
					/>
				))}
			</div>
		</div>
	);
}
