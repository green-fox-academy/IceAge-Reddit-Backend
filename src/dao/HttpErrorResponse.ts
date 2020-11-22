import { IncomingHttpHeaders } from 'http';

export class HttpErrorRespose {

	constructor(
		private error: string,
		private headers: IncomingHttpHeaders,
		private message: string,
		private name: string,
		private ok: boolean,
		private status: number,
		private statusText: string,
		private url: string,
	) {
		this.headers = {};
		this.name = "HttpErrorResponse";
	}
	
	public setUp(error: string, headers: IncomingHttpHeaders): void {
		this.setError(error);
		this.setHeaders(headers);
	}

	private setError(error: string): void {
		this.error = error;
	}

	private setHeaders(headers:  IncomingHttpHeaders) {
		this.headers = headers;
	}
}