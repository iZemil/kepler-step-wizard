import { AppModule } from './modules/app.module';
import { CONFIG } from './config';

async function bootstrap() {
	const {
		app: { port },
	} = CONFIG;
	const { app } = new AppModule();

	app.listen(port, () => console.log(`Back is running on: http://localhost:${port}`));
}
bootstrap();
