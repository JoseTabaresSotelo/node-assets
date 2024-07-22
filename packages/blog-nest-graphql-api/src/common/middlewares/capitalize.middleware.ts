import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import * as _ from 'lodash';

export const capitalizeMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  
  // console.log('AUTHOR', _.capitalize(value));

  return value;
};