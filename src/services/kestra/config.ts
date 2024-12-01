import { env } from '../../config/env';
import { parse } from 'yaml';
import { readFileSync } from 'fs';

export interface KestraConfig {
  name: string;
  tasks: Array<{
    id: string;
    type: string;
    inputs: Record<string, unknown>;
  }>;
}

export function getKestraConfig(): KestraConfig {
  try {
    return parse(readFileSync('kestra.yml', 'utf8'));
  } catch (error) {
    console.error('Failed to load Kestra config:', error);
    throw new Error('Failed to load Kestra configuration');
  }
}