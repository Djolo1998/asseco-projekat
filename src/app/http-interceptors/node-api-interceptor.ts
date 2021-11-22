import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class NodeApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const clonedReq = req.clone({
      headers: req.headers.set(
        'X-Sandbox-ID',
        '6b5ab0ff-4390-4553-8c7e-aa121a813885'
      ),
    });
    return next.handle(clonedReq);
  }
}
