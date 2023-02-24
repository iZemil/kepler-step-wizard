import { IWizard, ResultDto, ResultResponseDto } from '@shared';

const apiUrl = (path = '/') => `http://localhost:8080${path}`;
const quizesApi = (path = '') => apiUrl(`/quizes${path}`);

export const api = {
	findQuizes: async (): Promise<IWizard[]> =>
		fetch(quizesApi(`/`), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data.map((it: IWizard & { _id: string }) => ({ ...it, id: it._id }))),

	sendResult: async (id: string, body: ResultDto): Promise<ResultResponseDto> =>
		fetch(quizesApi(`/results/${id}`), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		}).then((res) => res.json()),
};
