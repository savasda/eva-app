import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { tap } from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable()
export class LoggingIntercepr implements NestInterceptor {
	intercept(
		context: ExecutionContext, 
		call$: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		
			const req = context.switchToHttp().getRequest();
			const { method, url } = req;
			const now = Date.now();

			return call$.handle().pipe(
				tap(() => Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name))
			)
 
	}
	
}