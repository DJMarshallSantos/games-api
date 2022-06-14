import { BadRequestException } from '@nestjs/common';

export function handleError(error: Error): undefined {
  const errorLines = error.message?.split('\n');
  const lastErrorLine = errorLines[errorLines.length - 1].trim();

  if (!lastErrorLine) {
    console.log(error);
  }

  throw new BadRequestException(
    lastErrorLine ||
      'Ocorreu um erro. Por favor, refresh a página e tennte novamente.',
  );
}
