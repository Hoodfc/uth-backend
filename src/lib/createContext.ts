import { Context } from './types';

const context = (req, res): Context => ({
  req,
  res,
});

export default context;
