import * as users from './users';
import * as questions from './questions';

const api = {
  users,
  questions,
};

const apiExport = {
  ...api,
};

export default apiExport;
