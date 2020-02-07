import { Context } from './types';

const context = (request): Context => ({
  req: request.req,
});

export default context;
