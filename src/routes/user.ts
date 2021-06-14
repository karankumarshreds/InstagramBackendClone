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

/**
 * @method PUT
 * @action Update a user
 */
router.put('/api/users/:uuid', async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  const { name, email, role } = req.body;
  try {
    const user = await User.findOne({ uuid });
    if (!user) {
      throw new Error('Unable to find the user');
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    await user.save();
    res.send(user);
  } catch (error) {
    console.error(error, '❌'); //
    return res.sendStatus(500);
  }
});

export { router as UserRouter };
