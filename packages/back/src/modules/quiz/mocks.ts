import { EQuestionType, IQuiz } from '@shared';

export const MOCKS: IQuiz[] = [
	{
		title: "What's my skin type?",
		description: 'Take this quick 5-question quiz to find out!',
		questions: [
			{
				title: "Let's start by having a quick look in the mirror: how's your complexion?",
				type: EQuestionType.single,
				options: [
					{ title: 'On the dull side' },
					{ title: 'Pretty shiny all over' },
					{ title: 'Shiny in places, dull in others' },
					{ title: 'Glowing, darling' },
				],
				answer: [0],
			},
			{
				title: 'And how would you describe your pores?',
				type: EQuestionType.multi,
				options: [{ title: '1' }, { title: '2' }, { title: '3' }, { title: '4' }],
				answer: [0, 1],
			},
			{ title: 'Does your skin get red much?', type: EQuestionType.number, answer: '0' },
			{ title: 'Do you get breakouts and what are they like?', type: EQuestionType.text, answer: '0' },
			{
				title: 'What does your skin feel like after moisturizing?',
				type: EQuestionType.single,
				options: [{ title: '1' }, { title: '2' }, { title: '3' }, { title: '4' }],
				answer: [0],
			},
		],
	},
];
