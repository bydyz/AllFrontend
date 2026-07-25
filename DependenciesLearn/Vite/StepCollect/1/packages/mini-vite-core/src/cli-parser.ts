import mri from 'mri'

export interface CliArgs {
  root?: string
  configFile?: string
  mode?: string
  port?: number
  host?: string
}

export function parseArgs(argv: string[]): CliArgs {
  return mri(argv, {
    alias: {
      c: 'configFile',
      m: 'mode',
      p: 'port',
      h: 'host',
    },
    string: ['configFile', 'mode', 'root', 'host'],
    number: ['port'],
    default: {
      mode: 'development',
    },
  })
}
