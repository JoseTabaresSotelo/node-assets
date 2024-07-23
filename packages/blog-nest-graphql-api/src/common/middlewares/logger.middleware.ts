import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const loggerMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  // console.log('======================');
  // console.log(ctx.source);
  // console.log(value);
  // console.log('======================');
  return value;
};