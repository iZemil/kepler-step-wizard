import { Express, Router, Request, Response } from 'express';
import { Db } from 'mongodb';
import { ResultDto } from '@shared';

import { QuizService } from './quiz.service';

export class QuizModule {
	public readonly router = Router();

	constructor(public readonly app: Express, public readonly db: Db, public readonly service = new QuizService(db)) {
		this.service.seed();
		this.initControllers();
	}

	initControllers() {
		this.router.get('/', this.findAll);
		this.router.post('/results/:id', this.checkResult);

		this.app.use('/quizes', this.router);
	}

	public findAll = async (req: Request, res: Response) => {
		const items = await this.service.findAll();

		res.json(items);
	};

	public checkResult = async (req: Request, res: Response) => {
		const { id } = req.params;
		const dto = ResultDto.normilize(req.body);
		const result = await this.service.checkResult(id, dto);

		res.json(result);
	};
}
