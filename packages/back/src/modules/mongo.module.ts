import { Db, MongoClient } from 'mongodb';

import { CONFIG } from '../config';

export class MongoModule {
	public client: MongoClient;
	public db: Db;

	public get config() {
		return CONFIG.db;
	}

	public get url() {
		const { user, pass, host, port } = this.config;

		return `mongodb://${user}:${pass}@${host}:${port}`;
	}

	constructor() {
		this.client = new MongoClient(this.url);
	}

	public async connect() {
		try {
			await this.client.connect();
			this.db = this.client.db(this.config.name);
			console.log(`MongoDB is running on: ${this.url}`);
		} catch (err) {
			console.error(`MongoDB ${this.url} error`, err);
		}
	}
}
