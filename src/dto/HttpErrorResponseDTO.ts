import { IncomingHttpHeaders } from 'http';

export class HttpErrorResposeDTO {

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

	public setHeaders(headers:  IncomingHttpHeaders) {
		this.headers = headers;
	}
}