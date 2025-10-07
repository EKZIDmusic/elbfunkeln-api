import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class DecimalToNumberInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.transformDecimals(data)));
  }

  private transformDecimals(data: any): any {
    if (data === null || data === undefined) {
      return data;
    }

    // Handle Decimal instances
    if (data instanceof Decimal) {
      return Number(data);
    }

    // Handle arrays
    if (Array.isArray(data)) {
      return data.map((item) => this.transformDecimals(item));
    }

    // Handle objects
    if (typeof data === 'object') {
      const transformed: any = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          transformed[key] = this.transformDecimals(data[key]);
        }
      }
      return transformed;
    }

    return data;
  }
}
