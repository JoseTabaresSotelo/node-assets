import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import AccessTokenModel from '../models/accessTokenModel';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let tokenModel: AccessTokenModel | null =
      this.localStorageService.get<AccessTokenModel>('tokenModel');

    // let newRequest: HttpRequest<any> = request.clone({
    //   headers: request.headers.set(
    //     'Authorization',
    //     `Bearer ${tokenModel?.Token}`
    //   ),
    // });

    let newRequest = request.clone({
      headers: request.headers.set(
        'Access-Control-Allow-Origin',
        `*`
      ),
    });

    // newRequest = request.clone({
    //   headers: request.headers.set(
    //     'Access-Control-Allow-Methods',
    //     `GET, POST, PUT, DELETE, PATCH, OPTIONS`
    //   ),
    // });

    //  newRequest = request.clone({
    //   headers: request.headers.set(
    //     'Referer',
    //     `http://127.0.0.1:3000/api`
    //   ),
    // });

    // newRequest = request.clone({
    //   headers: request.headers.set(
    //     'Access-Control-Allow-Headers',
    //     `X-Requested-With, content-type, Authorization`
    //   ),
    // });

    return next.handle(newRequest);
  }
}
