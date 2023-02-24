import { EQuestionType, IQuestion, TAnswer } from '../types';

export class ResultDto {
	public readonly data: TAnswer[];

	public static init(questions: IQuestion[]): ResultDto {
		return {
			data: questions.map((q) => {
				if (q.type === EQuestionType.multi || q.type === EQuestionType.single) {
					return [];
				}

				return '';
			}),
		};
	}

	public static normilize(dto: ResultDto): ResultDto {
		return {
			data: dto.data.map((answer) => {
				if (Array.isArray(answer)) {
					return answer.sort();
				}
				return answer;
			}),
		};
	}
}

export class ResultResponseDto {
	public readonly success: boolean;
	public readonly score: number;
}
