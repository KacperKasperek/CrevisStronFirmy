export type MysqlConnectionConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

function decodePart(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function parseMysqlConnectionString(value: string): MysqlConnectionConfig {
  const match = /^mysql:\/\/([^:]+):(.*)@([^:/?#]+)(?::(\d+))?\/([^?#]+)(?:\?.*)?$/.exec(value.trim());
  if (!match) throw new Error("DATABASE_URL ma nieprawidłowy format.");

  return {
    user: decodePart(match[1]),
    password: decodePart(match[2]),
    host: match[3],
    port: Number(match[4] ?? 3306),
    database: decodePart(match[5]),
  };
}
