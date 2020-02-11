import Context from '../types/Context';

const context = (req, res): Context => ({
  req,
  res,
});

export default context;
