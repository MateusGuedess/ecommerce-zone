import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';

const fakeUsers = [
  {
    id: 1,
    name: 'Teste 1',
    email: 'teste@teste',
    password: '1234',
  },
];

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  const prismaMock = {
    user: {
      create: jest.fn().mockReturnValue(fakeUsers[0]),
      findMany: jest.fn().mockReturnValue(fakeUsers),
      findUnique: jest.fn().mockReturnValue(fakeUsers[0]),
      update: jest.fn().mockReturnValue(fakeUsers[0]),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const response = await service.createUser(fakeUsers[0]);

      expect(response).toBe(fakeUsers[0]);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          ...fakeUsers[0],
          password: expect.any(String),
        },
      });
      expect(prisma.user.create).toHaveBeenCalledTimes(1);

      const hashedPassword = (prisma.user.create as jest.Mock).mock.calls[0][0]
        .data.password;
      const isMatch = await bcrypt.compare(
        fakeUsers[0].password,
        hashedPassword,
      );

      expect(isMatch).toBe(true);
    });
  });

  describe('update', () => {
    it('it should update a user', async () => {
      const response = await service.updateUser({
        where: { id: 1 },
        data: fakeUsers[0],
      });

      expect(response).toEqual(fakeUsers[0]);
      expect(prisma.user.update).toHaveBeenCalledTimes(1);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: fakeUsers[0],
      });
    });

    it('should return NotFoundException when no user is found', async () => {
      const unexistingUser = {
        id: 5,
        name: 'notFoundException name',
        email: 'notFoundException@notfoundException.com',
        password: '1234',
      };

      jest
        .spyOn(prisma.user, 'update')
        .mockRejectedValue(new NotFoundException());

      await expect(
        service.updateUser({ where: { id: 5 }, data: unexistingUser }),
      ).rejects.toThrow(NotFoundException);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 5 },
        data: unexistingUser,
      });
    });
  });

  describe('delete', () => {
    it('should delete user and return empty body', async () => {
      expect(await service.deleteUser({ id: 1 })).toBeUndefined();
      expect(prisma.user.delete).toHaveBeenCalledTimes(1);
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('find', () => {
    it('should return a user', async () => {
      const response = await service.find({ id: fakeUsers[0].id });

      expect(response).toEqual(fakeUsers[0]);
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: fakeUsers[0].id,
        },
      });
    });
  });
});
