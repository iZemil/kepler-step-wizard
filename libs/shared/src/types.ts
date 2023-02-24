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

export interface IOption {
	title: string;
}

export interface IQuestion {
	title: string;
	type: EQuestionType;
	options?: IOption[];
}

export interface IWizard {
	title: string;
	description: string;
	questions: IQuestion[];
}
