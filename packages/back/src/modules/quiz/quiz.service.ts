import { Db, ObjectId } from 'mongodb';
import { ResultDto, ResultResponseDto } from '@shared';

import { MOCKS } from './mocks';
import { QuizSchema } from './quiz.schema';

export class QuizService {
	constructor(private readonly db: Db, private readonly repo = db.collection<QuizSchema>('quizes')) {}

	public async seed() {
		const items = await this.findAll();
		const needSeed = items.length === 0;

		if (needSeed) {
			await this.save(MOCKS);
		}
	}

	public async save(data: QuizSchema[]) {
		return this.repo.insertMany(data);
	}

	public async findAll(): Promise<QuizSchema[]> {
		return this.repo.find({}).toArray();
	}

	public async checkResult(id: string, { data }: ResultDto): Promise<ResultResponseDto> {
		const quiz = await this.repo.findOne({ _id: new ObjectId(id) });
		let correct = 0;
		quiz.questions.forEach((question, index) => {
			const userAnswer = data[index];

			if (JSON.stringify(question.answer) === JSON.stringify(userAnswer)) {
				correct += 1;
			}
		});

		return {
			score: correct / quiz.questions.length,
			success: correct === quiz.questions.length,
		};
	}
}
