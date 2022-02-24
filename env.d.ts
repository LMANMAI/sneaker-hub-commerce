interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly API_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
