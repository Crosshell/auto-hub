import { applyDecorators, UseGuards } from '@nestjs/common';
import { SessionGuard } from '../../auth/guards/session.guard';

export function Authorization() {
  return applyDecorators(UseGuards(SessionGuard));
}
