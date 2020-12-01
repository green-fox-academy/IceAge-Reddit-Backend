import { Catch, PlatformContext, ExceptionFilterMethods } from "@tsed/common";
import { Exception } from "@tsed/exceptions";

@Catch(Exception)
export class HttpExceptionFilter implements ExceptionFilterMethods {
	catch(exception: Exception, ctx: PlatformContext) {
		const {response, logger} = ctx;
		const error = this.mapError(exception);

		logger.error({
			error
		});

		response
		.contentType('application/json')
		.status(exception.status)
		.body(error);
	}

	mapError(error: Exception): string {
		return error.message;
	}
}