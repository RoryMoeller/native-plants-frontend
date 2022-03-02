import { requireAuth } from '../../lib/auth';

import USER from '../../data/user';

function handler(req, res) {
  const { password, ...body } = USER;
  res.status(200).json(body);
}

export default requireAuth(handler);
