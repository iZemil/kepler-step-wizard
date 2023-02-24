import express from 'express';
import cors from 'cors';

import { QuizModule } from './quiz/quiz.module';
import { MongoModule } from './mongo.module';

/**
 * Root backend module
 */
export class AppModule {
	public modules: any[];

	constructor(public readonly app = express()) {
		this.app.use(express.json());
		this.app.use(express.text());
		this.app.use(cors());

		this.initModules();
	}

	public async initModules() {
		const mongo = new MongoModule();
		await mongo.connect();

		this.modules = [mongo, new QuizModule(this.app, mongo.db)];
	}
}
