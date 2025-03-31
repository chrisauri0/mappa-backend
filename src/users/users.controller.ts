import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Patch,
  Param,
  Query,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser, SelectUser } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() request: CreateUser) {
    return this.userService.createUser(request);
  }
  @Get('/reporte/activos')
  async getActiveUsers() {
    return this.userService.getActiveUsers();
  }

  @Get('/login/movil')
  async loginMovil(@Query('codeActivation') codeActivation: string) {
    if (!codeActivation) {
      throw new BadRequestException('El código de activación es obligatorio');
    }
    return this.userService.loginMovil(codeActivation);
  }

  @Post('/login')
  async login(@Body() request: SelectUser) {
    if (!request.email || !request.password) {
      throw new BadRequestException('Email and password must be provided');
    }
    return this.userService.login(request.email, request.password);
  }

  @Patch('/checkout2/:userId')
  async checkout2(@Param('userId') userId: string, @Body() body: { subscripcion: string }) {
    // Asegurar que el ID es numérico
    const id = Number(userId);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    // Buscar usuario en la base de datos
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Actualizar la suscripción del usuario
    return this.userService.updateUserSuscription(id, body.subscripcion);
  }

  @Patch('/checkout/:userId')
  async checkout(@Param('userId') userId: string, @Body() body: { status: string }) {
    // Asegurar que el ID es numérico
    const id = Number(userId);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    // Buscar usuario en la base de datos
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validar el estado del usuario
    const validStatuses = ['active', 'inactive'] as const;
    if (!validStatuses.includes(body.status as 'active' | 'inactive')) {
      throw new BadRequestException('Invalid status');
    }

    // Actualizar el estado del usuario
    return this.userService.updateUserStatus(id, body.status as 'active' | 'inactive');
  }
}
