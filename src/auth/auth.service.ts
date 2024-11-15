import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private JwtService: JwtService,
  ) {}

  async signIn(params: {
    email: string;
    password: string;
  }): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByEmail(params.email);

    if (!user) throw new NotFoundException('User not found');

    const passwordMatch = await bcrypt.compare(
      String(params.password),
      user.password,
    );

    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id };

    return { access_token: await this.JwtService.signAsync(payload) };
  }
}
