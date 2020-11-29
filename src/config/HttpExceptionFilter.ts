/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Catch, PlatformContext, ExceptionFilterMethods, ResponseErrorObject } from "@tsed/common";
import { Exception } from "@tsed/exceptions";

@Catch(Exception)
export class HttpExceptionFilter implements ExceptionFilterMethods {
  catch(exception: Exception, ctx: PlatformContext) {
    const {response, logger} = ctx;
		const error = this.mapError(exception);
		const headers = this.getHeaders(exception);

    logger.error({
      error
    });

		response
		.contentType('application/json')
		.setHeaders(headers)
		.status(exception.status)
		.body(error);
  }

  mapError(error: Exception): string {
    return error.message;
  }

  protected getHeaders(error: Exception) {
    return [error, error.origin].filter(Boolean).reduce((obj, {headers}: ResponseErrorObject) => {
      return {
        ...obj,
        ...(headers || {})
      };
    }, {});
  }
}