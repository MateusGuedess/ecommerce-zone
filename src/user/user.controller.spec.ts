import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { Prisma } from '.prisma/client';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const userData: Prisma.UserCreateInput = {
        email: 'test@test.com',
        name: 'Test',
      };
      const result = { email: 'test@test.com', name: 'Test' };
      jest.spyOn(userService, 'createUser').mockResolvedValue(result as any);

      expect(await userController.createUser(userData)).toEqual(result);
    });
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      const result = { email: 'test@test.com', name: 'Test' };
      jest.spyOn(userService, 'find').mockResolvedValue(result as any);

      expect(await userController.getUser({ id: 1 })).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{ email: 'test@test.com', name: 'Test' }];
      jest.spyOn(userService, 'findAll').mockResolvedValue(result as any);

      expect(await userController.findAll()).toEqual(result);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userData: Prisma.UserCreateInput = {
        email: 'test@test.com',
        name: 'Test',
      };
      const result = { email: 'test@test.com', name: 'Test' };
      jest.spyOn(userService, 'updateUser').mockResolvedValue(result as any);

      expect(await userController.updateUser({ id: 1 }, userData)).toEqual(
        result,
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      jest.spyOn(userService, 'deleteUser').mockResolvedValue(undefined);

      expect(await userController.deleteUser({ id: 1 })).toBeUndefined();
    });
  });
});
