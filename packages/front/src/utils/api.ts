import { IQuiz, ResultDto, ResultResponseDto } from '@shared';

const apiUrl = (path = '/') => `http://localhost:8080${path}`;
const quizesApi = (path = '') => apiUrl(`/quizes${path}`);
const requestApi = <T>(url: string, method: 'GET' | 'POST' = 'GET', body?: T) =>
	fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

export const api = {
	findQuizes: async (): Promise<IQuiz[]> =>
		requestApi(quizesApi(`/`))
			.then((res) => res.json())
			.then((data) => data.map((it: IQuiz & { _id: string }) => ({ ...it, id: it._id }))),

	sendResult: async (id: string, body: ResultDto): Promise<ResultResponseDto> =>
		requestApi(quizesApi(`/results/${id}`), 'POST', body).then((res) => res.json()),
};
