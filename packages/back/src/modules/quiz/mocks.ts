import { EQuestionType, IWizard } from '@shared';

export const MOCKS: IWizard[] = [
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
				answer: [1],
			},
			{
				title: 'And how would you describe your pores?',
				type: EQuestionType.multi,
				options: [{ title: '1' }, { title: '2' }, { title: '3' }, { title: '4' }],
				answer: [1, 2],
			},
			{ title: 'Does your skin get red much?', type: EQuestionType.number, answer: '1' },
			{ title: 'Do you get breakouts and what are they like?', type: EQuestionType.text, answer: '1' },
			{
				title: 'What does your skin feel like after moisturizing?',
				type: EQuestionType.single,
				options: [{ title: '1' }, { title: '2' }, { title: '3' }, { title: '4' }],
				answer: [1],
			},
		],
	},
];
