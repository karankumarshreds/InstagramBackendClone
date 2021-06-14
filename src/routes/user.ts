import express, { Request, Response } from 'express';
import { User } from '../entity';
const router = express.Router();

/**
 * @method POST
 * @action Creates a user
 */
router.post('/api/users', async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  try {
    const user = User.create({ name, email, role });
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    console.error(error, '❌'); //
    return res.sendStatus(500);
  }
});

/**
 * @method GET
 * @action Returns the users
 */
router.get('/api/users', async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error(error, '❌'); //
    return res.sendStatus(500);
  }
});

export { router as UserRouter };
