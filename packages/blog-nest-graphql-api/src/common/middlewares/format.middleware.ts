import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const loggerMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  // console.log(ctx.args);
  // console.log(ctx.info);
  // console.log(ctx.context);
  // console.log(ctx.source);
  // console.log('==========>');
  // console.log(value);
  return value.toUpperCase();
};

  