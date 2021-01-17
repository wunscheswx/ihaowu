
/**
 * Client
**/

import * as runtime from './runtime';

export import DMMF = runtime.DMMF

/**
 * Prisma Errors
 */
export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
export import PrismaClientValidationError = runtime.PrismaClientValidationError

/**
 * Re-export of sql-template-tag
 */
export import sql = runtime.sqltag
export import empty = runtime.empty
export import join = runtime.join
export import raw = runtime.raw
export import Sql = runtime.Sql

/**
 * Decimal.js
 */
export import Decimal = runtime.Decimal

/**
 * Prisma Client JS version: 2.14.0
 * Query Engine version: 5d491261d382a2a5ffdc71de17072b0e409f1cc1
 */
export type PrismaVersion = {
  client: string
}

export const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export type InputJsonObject = {[Key in string]?: JsonValue}
 
export interface InputJsonArray extends Array<JsonValue> {}
 
export type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray
 type SelectAndInclude = {
  select: any
  include: any
}
type HasSelect = {
  select: any
}
type HasInclude = {
  include: any
}
type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};

/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
  [key in keyof T]: key extends keyof U ? T[key] : never
} &
  K

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any>
? False
: T extends Date
? False
: T extends Buffer
? False
: T extends BigInt
? False
: T extends object
? True
: False


/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

/**
 * From ts-toolbelt
 */

export type Union = any

/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};

type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;

type Key = string | number | symbol;
type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];

export type ComputeRaw<A extends any> = A extends Function ? A : {
  [K in keyof A]: A[K];
} & {};

export type OptionalFlat<O> = {
  [K in keyof O]?: O[K];
} & {};

type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<Record<Exclude<Keys<_U>, keyof U>, never>> : never;

export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/

export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

/**
A [[Boolean]]
*/
export type Boolean = True | False

// /**
// 1
// */
export type True = 1

/**
0
*/
export type False = 0

export type Not<B extends Boolean> = {
  0: 1
  1: 0
}[B]

export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
  ? 0 // anything `never` is false
  : A1 extends A2
  ? 1
  : 0

export type Has<U extends Union, U1 extends Union> = Not<
  Extends<Exclude<U1, U>, U1>
>

export type Or<B1 extends Boolean, B2 extends Boolean> = {
  0: {
    0: 0
    1: 1
  }
  1: {
    0: 1
    1: 1
  }
}[B1][B2]

export type Keys<U extends Union> = U extends unknown ? keyof U : never



/**
 * Used by group by
 */

export type GetScalarType<T, O> = O extends object ? {
  [P in keyof T]: P extends keyof O
    ? O[P]
    : never
} : never

type FieldPaths<
  T,
  U = Omit<T, 'avg' | 'sum' | 'count' | 'min' | 'max'>
> = IsObject<T> extends True ? U : T

type GetHavingFields<T> = {
  [K in keyof T]: Or<
    Or<Extends<'OR', K>, Extends<'AND', K>>,
    Extends<'NOT', K>
  > extends True
    ? // infer is only needed to not hit TS limit
      // based on the brilliant idea of Pierre-Antoine Mills
      // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
      T[K] extends infer TK
      ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
      : never
    : {} extends FieldPaths<T[K]>
    ? never
    : K
}[keyof T]

/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

/**
 * Like `Pick`, but with an array
 */
type PickArray<T, K extends Array<keyof T>> = Pick<T, TupleToUnion<K>>





/**
 * Model SysUser
 */

export type SysUser = {
  id: number
  uid: string
  avatar: string | null
  nickname: string | null
  gender: number
  birthday: string | null
  username: string | null
  password: string | null
  verified: boolean
  mobile: string | null
  email: string | null
  isDeleted: boolean
  isLocked: boolean
  isAdmin: boolean
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

/**
 * Model SysUserLog
 */

export type SysUserLog = {
  id: number
  category: string
  level: string
  action: string
  message: string
  details: string | null
  userAgent: string
  clientIp: string
  createdBy: number
  createdAt: Date
  sysUserId: number
}

/**
 * Model SysUserIdentityCertification
 */

export type SysUserIdentityCertification = {
  id: number
  realName: string
  idCardType: number
  idCardNo: string
  idCardFrontImage: string
  idCardBackImage: string
  holdIDCardImage: string
  checkStatus: number
  reason: string | null
  createdAt: Date
  updatedAt: Date | null
  sysUserId: number
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more SysUsers
 * const sysUsers = await prisma.sysUser.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more SysUsers
   * const sysUsers = await prisma.sysUser.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']

      /**
   * `prisma.sysUser`: Exposes CRUD operations for the **SysUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SysUsers
    * const sysUsers = await prisma.sysUser.findMany()
    * ```
    */
  get sysUser(): Prisma.SysUserDelegate;

  /**
   * `prisma.sysUserLog`: Exposes CRUD operations for the **SysUserLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SysUserLogs
    * const sysUserLogs = await prisma.sysUserLog.findMany()
    * ```
    */
  get sysUserLog(): Prisma.SysUserLogDelegate;

  /**
   * `prisma.sysUserIdentityCertification`: Exposes CRUD operations for the **SysUserIdentityCertification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SysUserIdentityCertifications
    * const sysUserIdentityCertifications = await prisma.sysUserIdentityCertification.findMany()
    * ```
    */
  get sysUserIdentityCertification(): Prisma.SysUserIdentityCertificationDelegate;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  /**
   * Prisma Client JS version: 2.14.0
   * Query Engine version: 5d491261d382a2a5ffdc71de17072b0e409f1cc1
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | null | JsonObject | JsonArray

  /**
   * Same as JsonObject, but allows undefined
   */
  export type InputJsonObject = {[Key in string]?: JsonValue}
 
  export interface InputJsonArray extends Array<JsonValue> {}
 
  export type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray
   type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  export type Union = any

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, 'avg' | 'sum' | 'count' | 'min' | 'max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Pick<T, TupleToUnion<K>>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    SysUser: 'SysUser',
    SysUserLog: 'SysUserLog',
    SysUserIdentityCertification: 'SysUserIdentityCertification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }


  /**
   * Model SysUser
   */


  export type AggregateSysUser = {
    count: number | null
    avg: SysUserAvgAggregateOutputType | null
    sum: SysUserSumAggregateOutputType | null
    min: SysUserMinAggregateOutputType | null
    max: SysUserMaxAggregateOutputType | null
  }

  export type SysUserAvgAggregateOutputType = {
    id: number
    gender: number
  }

  export type SysUserSumAggregateOutputType = {
    id: number
    gender: number
  }

  export type SysUserMinAggregateOutputType = {
    id: number
    uid: string | null
    avatar: string | null
    nickname: string | null
    gender: number
    birthday: string | null
    username: string | null
    password: string | null
    verified: boolean | null
    mobile: string | null
    email: string | null
    isDeleted: boolean | null
    isLocked: boolean | null
    isAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type SysUserMaxAggregateOutputType = {
    id: number
    uid: string | null
    avatar: string | null
    nickname: string | null
    gender: number
    birthday: string | null
    username: string | null
    password: string | null
    verified: boolean | null
    mobile: string | null
    email: string | null
    isDeleted: boolean | null
    isLocked: boolean | null
    isAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type SysUserCountAggregateOutputType = {
    id: number
    uid: number | null
    avatar: number | null
    nickname: number | null
    gender: number
    birthday: number | null
    username: number | null
    password: number | null
    verified: number | null
    mobile: number | null
    email: number | null
    isDeleted: number | null
    isLocked: number | null
    isAdmin: number | null
    createdAt: number | null
    updatedAt: number | null
    deletedAt: number | null
    _all: number
  }


  export type SysUserAvgAggregateInputType = {
    id?: true
    gender?: true
  }

  export type SysUserSumAggregateInputType = {
    id?: true
    gender?: true
  }

  export type SysUserMinAggregateInputType = {
    id?: true
    uid?: true
    avatar?: true
    nickname?: true
    gender?: true
    birthday?: true
    username?: true
    password?: true
    verified?: true
    mobile?: true
    email?: true
    isDeleted?: true
    isLocked?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type SysUserMaxAggregateInputType = {
    id?: true
    uid?: true
    avatar?: true
    nickname?: true
    gender?: true
    birthday?: true
    username?: true
    password?: true
    verified?: true
    mobile?: true
    email?: true
    isDeleted?: true
    isLocked?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type SysUserCountAggregateInputType = {
    id?: true
    uid?: true
    avatar?: true
    nickname?: true
    gender?: true
    birthday?: true
    username?: true
    password?: true
    verified?: true
    mobile?: true
    email?: true
    isDeleted?: true
    isLocked?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type AggregateSysUserArgs = {
    /**
     * Filter which SysUser to aggregate.
    **/
    where?: SysUserWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of SysUsers to fetch.
    **/
    orderBy?: Enumerable<SysUserOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: SysUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SysUsers from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SysUsers.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SysUsers
    **/
    count?: true
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: SysUserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: SysUserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: SysUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: SysUserMaxAggregateInputType
  }

  export type GetSysUserAggregateType<T extends AggregateSysUserArgs> = {
    [P in keyof T]: P extends 'count' ? number : GetSysUserAggregateScalarType<T[P]>
  }

  export type GetSysUserAggregateScalarType<T extends any> = {
    [P in keyof T]: P extends keyof SysUserAvgAggregateOutputType ? SysUserAvgAggregateOutputType[P] : never
  }

    



  export type SysUserSelect = {
    id?: boolean
    uid?: boolean
    avatar?: boolean
    nickname?: boolean
    gender?: boolean
    birthday?: boolean
    username?: boolean
    password?: boolean
    verified?: boolean
    mobile?: boolean
    email?: boolean
    isDeleted?: boolean
    isLocked?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    SysUserLogs?: boolean | FindManySysUserLogArgs
    SysUserIdentityCertification?: boolean | SysUserIdentityCertificationArgs
  }

  export type SysUserInclude = {
    SysUserLogs?: boolean | FindManySysUserLogArgs
    SysUserIdentityCertification?: boolean | SysUserIdentityCertificationArgs
  }

  export type SysUserGetPayload<
    S extends boolean | null | undefined | SysUserArgs,
    U = keyof S
      > = S extends true
        ? SysUser
    : S extends undefined
    ? never
    : S extends SysUserArgs | FindManySysUserArgs
    ?'include' extends U
    ? SysUser  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'SysUserLogs'
        ? Array < SysUserLogGetPayload<S['include'][P]>>  :
        P extends 'SysUserIdentityCertification'
        ? SysUserIdentityCertificationGetPayload<S['include'][P]> | null : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof SysUser ?SysUser [P]
  : 
          P extends 'SysUserLogs'
        ? Array < SysUserLogGetPayload<S['select'][P]>>  :
        P extends 'SysUserIdentityCertification'
        ? SysUserIdentityCertificationGetPayload<S['select'][P]> | null : never
  } 
    : SysUser
  : SysUser


  export interface SysUserDelegate {
    /**
     * Find zero or one SysUser that matches the filter.
     * @param {FindUniqueSysUserArgs} args - Arguments to find a SysUser
     * @example
     * // Get one SysUser
     * const sysUser = await prisma.sysUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FindUniqueSysUserArgs>(
      args: Subset<T, FindUniqueSysUserArgs>
    ): CheckSelect<T, Prisma__SysUserClient<SysUser | null>, Prisma__SysUserClient<SysUserGetPayload<T> | null>>

    /**
     * Find the first SysUser that matches the filter.
     * @param {FindFirstSysUserArgs} args - Arguments to find a SysUser
     * @example
     * // Get one SysUser
     * const sysUser = await prisma.sysUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FindFirstSysUserArgs>(
      args?: Subset<T, FindFirstSysUserArgs>
    ): CheckSelect<T, Prisma__SysUserClient<SysUser | null>, Prisma__SysUserClient<SysUserGetPayload<T> | null>>

    /**
     * Find zero or more SysUsers that matches the filter.
     * @param {FindManySysUserArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SysUsers
     * const sysUsers = await prisma.sysUser.findMany()
     * 
     * // Get first 10 SysUsers
     * const sysUsers = await prisma.sysUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sysUserWithIdOnly = await prisma.sysUser.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FindManySysUserArgs>(
      args?: Subset<T, FindManySysUserArgs>
    ): CheckSelect<T, Promise<Array<SysUser>>, Promise<Array<SysUserGetPayload<T>>>>

    /**
     * Create a SysUser.
     * @param {SysUserCreateArgs} args - Arguments to create a SysUser.
     * @example
     * // Create one SysUser
     * const SysUser = await prisma.sysUser.create({
     *   data: {
     *     // ... data to create a SysUser
     *   }
     * })
     * 
    **/
    create<T extends SysUserCreateArgs>(
      args: Subset<T, SysUserCreateArgs>
    ): CheckSelect<T, Prisma__SysUserClient<SysUser>, Prisma__SysUserClient<SysUserGetPayload<T>>>

    /**
     * Delete a SysUser.
     * @param {SysUserDeleteArgs} args - Arguments to delete one SysUser.
     * @example
     * // Delete one SysUser
     * const SysUser = await prisma.sysUser.delete({
     *   where: {
     *     // ... filter to delete one SysUser
     *   }
     * })
     * 
    **/
    delete<T extends SysUserDeleteArgs>(
      args: Subset<T, SysUserDeleteArgs>
    ): CheckSelect<T, Prisma__SysUserClient<SysUser>, Prisma__SysUserClient<SysUserGetPayload<T>>>

    /**
     * Update one SysUser.
     * @param {SysUserUpdateArgs} args - Arguments to update one SysUser.
     * @example
     * // Update one SysUser
     * const sysUser = await prisma.sysUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SysUserUpdateArgs>(
      args: Subset<T, SysUserUpdateArgs>
    ): CheckSelect<T, Prisma__SysUserClient<SysUser>, Prisma__SysUserClient<SysUserGetPayload<T>>>

    /**
     * Delete zero or more SysUsers.
     * @param {SysUserDeleteManyArgs} args - Arguments to filter SysUsers to delete.
     * @example
     * // Delete a few SysUsers
     * const { count } = await prisma.sysUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SysUserDeleteManyArgs>(
      args?: Subset<T, SysUserDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more SysUsers.
     * @param {SysUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SysUsers
     * const sysUser = await prisma.sysUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SysUserUpdateManyArgs>(
      args: Subset<T, SysUserUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one SysUser.
     * @param {SysUserUpsertArgs} args - Arguments to update or create a SysUser.
     * @example
     * // Update or create a SysUser
     * const sysUser = await prisma.sysUser.upsert({
     *   create: {
     *     // ... data to create a SysUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SysUser we want to update
     *   }
     * })
    **/
    upsert<T extends SysUserUpsertArgs>(
      args: Subset<T, SysUserUpsertArgs>
    ): CheckSelect<T, Prisma__SysUserClient<SysUser>, Prisma__SysUserClient<SysUserGetPayload<T>>>

    /**
     * Find zero or one SysUser that matches the filter.
     * @param {FindUniqueSysUserArgs} args - Arguments to find a SysUser
     * @deprecated This will be deprecated please use prisma.sysUser.findUnique
     * @example
     * // Get one SysUser
     * const sysUser = await prisma.sysUser.findOne({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findOne<T extends FindUniqueSysUserArgs>(
      args: Subset<T, FindUniqueSysUserArgs>
    ): CheckSelect<T, Prisma__SysUserClient<SysUser | null>, Prisma__SysUserClient<SysUserGetPayload<T> | null>>

    /**
     * Count the number of SysUsers.
     * @param {FindManySysUserArgs} args - Arguments to filter SysUsers to count.
     * @example
     * // Count the number of SysUsers
     * const count = await prisma.sysUser.count({
     *   where: {
     *     // ... the filter for the SysUsers we want to count
     *   }
     * })
    **/
    count(args?: Omit<FindManySysUserArgs, 'select' | 'include'>): Promise<number>

    /**
     * Allows you to perform aggregations operations on a SysUser.
     * @param {AggregateSysUserArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AggregateSysUserArgs>(args: Subset<T, AggregateSysUserArgs>): Promise<GetSysUserAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for SysUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SysUserClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    SysUserLogs<T extends FindManySysUserLogArgs = {}>(args?: Subset<T, FindManySysUserLogArgs>): CheckSelect<T, Promise<Array<SysUserLog>>, Promise<Array<SysUserLogGetPayload<T>>>>;

    SysUserIdentityCertification<T extends SysUserIdentityCertificationArgs = {}>(args?: Subset<T, SysUserIdentityCertificationArgs>): CheckSelect<T, Prisma__SysUserIdentityCertificationClient<SysUserIdentityCertification | null>, Prisma__SysUserIdentityCertificationClient<SysUserIdentityCertificationGetPayload<T> | null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * SysUser findUnique
   */
  export type FindUniqueSysUserArgs = {
    /**
     * Select specific fields to fetch from the SysUser
    **/
    select?: SysUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserInclude | null
    /**
     * Filter, which SysUser to fetch.
    **/
    where: SysUserWhereUniqueInput
  }


  /**
   * SysUser findFirst
   */
  export type FindFirstSysUserArgs = {
    /**
     * Select specific fields to fetch from the SysUser
    **/
    select?: SysUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserInclude | null
    /**
     * Filter, which SysUser to fetch.
    **/
    where?: SysUserWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of SysUsers to fetch.
    **/
    orderBy?: Enumerable<SysUserOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SysUsers.
    **/
    cursor?: SysUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SysUsers from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SysUsers.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of SysUsers.
    **/
    distinct?: Enumerable<SysUserScalarFieldEnum>
  }


  /**
   * SysUser findMany
   */
  export type FindManySysUserArgs = {
    /**
     * Select specific fields to fetch from the SysUser
    **/
    select?: SysUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserInclude | null
    /**
     * Filter, which SysUsers to fetch.
    **/
    where?: SysUserWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of SysUsers to fetch.
    **/
    orderBy?: Enumerable<SysUserOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SysUsers.
    **/
    cursor?: SysUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SysUsers from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SysUsers.
    **/
    skip?: number
    distinct?: Enumerable<SysUserScalarFieldEnum>
  }


  /**
   * SysUser create
   */
  export type SysUserCreateArgs = {
    /**
     * Select specific fields to fetch from the SysUser
    **/
    select?: SysUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserInclude | null
    /**
     * The data needed to create a SysUser.
    **/
    data: SysUserCreateInput
  }


  /**
   * SysUser update
   */
  export type SysUserUpdateArgs = {
    /**
     * Select specific fields to fetch from the SysUser
    **/
    select?: SysUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserInclude | null
    /**
     * The data needed to update a SysUser.
    **/
    data: SysUserUpdateInput
    /**
     * Choose, which SysUser to update.
    **/
    where: SysUserWhereUniqueInput
  }


  /**
   * SysUser updateMany
   */
  export type SysUserUpdateManyArgs = {
    data: SysUserUpdateManyMutationInput
    where?: SysUserWhereInput
  }


  /**
   * SysUser upsert
   */
  export type SysUserUpsertArgs = {
    /**
     * Select specific fields to fetch from the SysUser
    **/
    select?: SysUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserInclude | null
    /**
     * The filter to search for the SysUser to update in case it exists.
    **/
    where: SysUserWhereUniqueInput
    /**
     * In case the SysUser found by the `where` argument doesn't exist, create a new SysUser with this data.
    **/
    create: SysUserCreateInput
    /**
     * In case the SysUser was found with the provided `where` argument, update it with this data.
    **/
    update: SysUserUpdateInput
  }


  /**
   * SysUser delete
   */
  export type SysUserDeleteArgs = {
    /**
     * Select specific fields to fetch from the SysUser
    **/
    select?: SysUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserInclude | null
    /**
     * Filter which SysUser to delete.
    **/
    where: SysUserWhereUniqueInput
  }


  /**
   * SysUser deleteMany
   */
  export type SysUserDeleteManyArgs = {
    where?: SysUserWhereInput
  }


  /**
   * SysUser without action
   */
  export type SysUserArgs = {
    /**
     * Select specific fields to fetch from the SysUser
    **/
    select?: SysUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserInclude | null
  }



  /**
   * Model SysUserLog
   */


  export type AggregateSysUserLog = {
    count: number | null
    avg: SysUserLogAvgAggregateOutputType | null
    sum: SysUserLogSumAggregateOutputType | null
    min: SysUserLogMinAggregateOutputType | null
    max: SysUserLogMaxAggregateOutputType | null
  }

  export type SysUserLogAvgAggregateOutputType = {
    id: number
    createdBy: number
    sysUserId: number
  }

  export type SysUserLogSumAggregateOutputType = {
    id: number
    createdBy: number
    sysUserId: number
  }

  export type SysUserLogMinAggregateOutputType = {
    id: number
    category: string | null
    level: string | null
    action: string | null
    message: string | null
    details: string | null
    userAgent: string | null
    clientIp: string | null
    createdBy: number
    createdAt: Date | null
    sysUserId: number
  }

  export type SysUserLogMaxAggregateOutputType = {
    id: number
    category: string | null
    level: string | null
    action: string | null
    message: string | null
    details: string | null
    userAgent: string | null
    clientIp: string | null
    createdBy: number
    createdAt: Date | null
    sysUserId: number
  }

  export type SysUserLogCountAggregateOutputType = {
    id: number
    category: number | null
    level: number | null
    action: number | null
    message: number | null
    details: number | null
    userAgent: number | null
    clientIp: number | null
    createdBy: number
    createdAt: number | null
    sysUserId: number
    _all: number
  }


  export type SysUserLogAvgAggregateInputType = {
    id?: true
    createdBy?: true
    sysUserId?: true
  }

  export type SysUserLogSumAggregateInputType = {
    id?: true
    createdBy?: true
    sysUserId?: true
  }

  export type SysUserLogMinAggregateInputType = {
    id?: true
    category?: true
    level?: true
    action?: true
    message?: true
    details?: true
    userAgent?: true
    clientIp?: true
    createdBy?: true
    createdAt?: true
    sysUserId?: true
  }

  export type SysUserLogMaxAggregateInputType = {
    id?: true
    category?: true
    level?: true
    action?: true
    message?: true
    details?: true
    userAgent?: true
    clientIp?: true
    createdBy?: true
    createdAt?: true
    sysUserId?: true
  }

  export type SysUserLogCountAggregateInputType = {
    id?: true
    category?: true
    level?: true
    action?: true
    message?: true
    details?: true
    userAgent?: true
    clientIp?: true
    createdBy?: true
    createdAt?: true
    sysUserId?: true
    _all?: true
  }

  export type AggregateSysUserLogArgs = {
    /**
     * Filter which SysUserLog to aggregate.
    **/
    where?: SysUserLogWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of SysUserLogs to fetch.
    **/
    orderBy?: Enumerable<SysUserLogOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: SysUserLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SysUserLogs from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SysUserLogs.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SysUserLogs
    **/
    count?: true
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: SysUserLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: SysUserLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: SysUserLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: SysUserLogMaxAggregateInputType
  }

  export type GetSysUserLogAggregateType<T extends AggregateSysUserLogArgs> = {
    [P in keyof T]: P extends 'count' ? number : GetSysUserLogAggregateScalarType<T[P]>
  }

  export type GetSysUserLogAggregateScalarType<T extends any> = {
    [P in keyof T]: P extends keyof SysUserLogAvgAggregateOutputType ? SysUserLogAvgAggregateOutputType[P] : never
  }

    



  export type SysUserLogSelect = {
    id?: boolean
    category?: boolean
    level?: boolean
    action?: boolean
    message?: boolean
    details?: boolean
    userAgent?: boolean
    clientIp?: boolean
    createdBy?: boolean
    createdAt?: boolean
    sysUserId?: boolean
    SysUser?: boolean | SysUserArgs
  }

  export type SysUserLogInclude = {
    SysUser?: boolean | SysUserArgs
  }

  export type SysUserLogGetPayload<
    S extends boolean | null | undefined | SysUserLogArgs,
    U = keyof S
      > = S extends true
        ? SysUserLog
    : S extends undefined
    ? never
    : S extends SysUserLogArgs | FindManySysUserLogArgs
    ?'include' extends U
    ? SysUserLog  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'SysUser'
        ? SysUserGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof SysUserLog ?SysUserLog [P]
  : 
          P extends 'SysUser'
        ? SysUserGetPayload<S['select'][P]> : never
  } 
    : SysUserLog
  : SysUserLog


  export interface SysUserLogDelegate {
    /**
     * Find zero or one SysUserLog that matches the filter.
     * @param {FindUniqueSysUserLogArgs} args - Arguments to find a SysUserLog
     * @example
     * // Get one SysUserLog
     * const sysUserLog = await prisma.sysUserLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FindUniqueSysUserLogArgs>(
      args: Subset<T, FindUniqueSysUserLogArgs>
    ): CheckSelect<T, Prisma__SysUserLogClient<SysUserLog | null>, Prisma__SysUserLogClient<SysUserLogGetPayload<T> | null>>

    /**
     * Find the first SysUserLog that matches the filter.
     * @param {FindFirstSysUserLogArgs} args - Arguments to find a SysUserLog
     * @example
     * // Get one SysUserLog
     * const sysUserLog = await prisma.sysUserLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FindFirstSysUserLogArgs>(
      args?: Subset<T, FindFirstSysUserLogArgs>
    ): CheckSelect<T, Prisma__SysUserLogClient<SysUserLog | null>, Prisma__SysUserLogClient<SysUserLogGetPayload<T> | null>>

    /**
     * Find zero or more SysUserLogs that matches the filter.
     * @param {FindManySysUserLogArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SysUserLogs
     * const sysUserLogs = await prisma.sysUserLog.findMany()
     * 
     * // Get first 10 SysUserLogs
     * const sysUserLogs = await prisma.sysUserLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sysUserLogWithIdOnly = await prisma.sysUserLog.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FindManySysUserLogArgs>(
      args?: Subset<T, FindManySysUserLogArgs>
    ): CheckSelect<T, Promise<Array<SysUserLog>>, Promise<Array<SysUserLogGetPayload<T>>>>

    /**
     * Create a SysUserLog.
     * @param {SysUserLogCreateArgs} args - Arguments to create a SysUserLog.
     * @example
     * // Create one SysUserLog
     * const SysUserLog = await prisma.sysUserLog.create({
     *   data: {
     *     // ... data to create a SysUserLog
     *   }
     * })
     * 
    **/
    create<T extends SysUserLogCreateArgs>(
      args: Subset<T, SysUserLogCreateArgs>
    ): CheckSelect<T, Prisma__SysUserLogClient<SysUserLog>, Prisma__SysUserLogClient<SysUserLogGetPayload<T>>>

    /**
     * Delete a SysUserLog.
     * @param {SysUserLogDeleteArgs} args - Arguments to delete one SysUserLog.
     * @example
     * // Delete one SysUserLog
     * const SysUserLog = await prisma.sysUserLog.delete({
     *   where: {
     *     // ... filter to delete one SysUserLog
     *   }
     * })
     * 
    **/
    delete<T extends SysUserLogDeleteArgs>(
      args: Subset<T, SysUserLogDeleteArgs>
    ): CheckSelect<T, Prisma__SysUserLogClient<SysUserLog>, Prisma__SysUserLogClient<SysUserLogGetPayload<T>>>

    /**
     * Update one SysUserLog.
     * @param {SysUserLogUpdateArgs} args - Arguments to update one SysUserLog.
     * @example
     * // Update one SysUserLog
     * const sysUserLog = await prisma.sysUserLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SysUserLogUpdateArgs>(
      args: Subset<T, SysUserLogUpdateArgs>
    ): CheckSelect<T, Prisma__SysUserLogClient<SysUserLog>, Prisma__SysUserLogClient<SysUserLogGetPayload<T>>>

    /**
     * Delete zero or more SysUserLogs.
     * @param {SysUserLogDeleteManyArgs} args - Arguments to filter SysUserLogs to delete.
     * @example
     * // Delete a few SysUserLogs
     * const { count } = await prisma.sysUserLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SysUserLogDeleteManyArgs>(
      args?: Subset<T, SysUserLogDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more SysUserLogs.
     * @param {SysUserLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SysUserLogs
     * const sysUserLog = await prisma.sysUserLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SysUserLogUpdateManyArgs>(
      args: Subset<T, SysUserLogUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one SysUserLog.
     * @param {SysUserLogUpsertArgs} args - Arguments to update or create a SysUserLog.
     * @example
     * // Update or create a SysUserLog
     * const sysUserLog = await prisma.sysUserLog.upsert({
     *   create: {
     *     // ... data to create a SysUserLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SysUserLog we want to update
     *   }
     * })
    **/
    upsert<T extends SysUserLogUpsertArgs>(
      args: Subset<T, SysUserLogUpsertArgs>
    ): CheckSelect<T, Prisma__SysUserLogClient<SysUserLog>, Prisma__SysUserLogClient<SysUserLogGetPayload<T>>>

    /**
     * Find zero or one SysUserLog that matches the filter.
     * @param {FindUniqueSysUserLogArgs} args - Arguments to find a SysUserLog
     * @deprecated This will be deprecated please use prisma.sysUserLog.findUnique
     * @example
     * // Get one SysUserLog
     * const sysUserLog = await prisma.sysUserLog.findOne({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findOne<T extends FindUniqueSysUserLogArgs>(
      args: Subset<T, FindUniqueSysUserLogArgs>
    ): CheckSelect<T, Prisma__SysUserLogClient<SysUserLog | null>, Prisma__SysUserLogClient<SysUserLogGetPayload<T> | null>>

    /**
     * Count the number of SysUserLogs.
     * @param {FindManySysUserLogArgs} args - Arguments to filter SysUserLogs to count.
     * @example
     * // Count the number of SysUserLogs
     * const count = await prisma.sysUserLog.count({
     *   where: {
     *     // ... the filter for the SysUserLogs we want to count
     *   }
     * })
    **/
    count(args?: Omit<FindManySysUserLogArgs, 'select' | 'include'>): Promise<number>

    /**
     * Allows you to perform aggregations operations on a SysUserLog.
     * @param {AggregateSysUserLogArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AggregateSysUserLogArgs>(args: Subset<T, AggregateSysUserLogArgs>): Promise<GetSysUserLogAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for SysUserLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SysUserLogClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    SysUser<T extends SysUserArgs = {}>(args?: Subset<T, SysUserArgs>): CheckSelect<T, Prisma__SysUserClient<SysUser | null>, Prisma__SysUserClient<SysUserGetPayload<T> | null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * SysUserLog findUnique
   */
  export type FindUniqueSysUserLogArgs = {
    /**
     * Select specific fields to fetch from the SysUserLog
    **/
    select?: SysUserLogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserLogInclude | null
    /**
     * Filter, which SysUserLog to fetch.
    **/
    where: SysUserLogWhereUniqueInput
  }


  /**
   * SysUserLog findFirst
   */
  export type FindFirstSysUserLogArgs = {
    /**
     * Select specific fields to fetch from the SysUserLog
    **/
    select?: SysUserLogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserLogInclude | null
    /**
     * Filter, which SysUserLog to fetch.
    **/
    where?: SysUserLogWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of SysUserLogs to fetch.
    **/
    orderBy?: Enumerable<SysUserLogOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SysUserLogs.
    **/
    cursor?: SysUserLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SysUserLogs from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SysUserLogs.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of SysUserLogs.
    **/
    distinct?: Enumerable<SysUserLogScalarFieldEnum>
  }


  /**
   * SysUserLog findMany
   */
  export type FindManySysUserLogArgs = {
    /**
     * Select specific fields to fetch from the SysUserLog
    **/
    select?: SysUserLogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserLogInclude | null
    /**
     * Filter, which SysUserLogs to fetch.
    **/
    where?: SysUserLogWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of SysUserLogs to fetch.
    **/
    orderBy?: Enumerable<SysUserLogOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SysUserLogs.
    **/
    cursor?: SysUserLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SysUserLogs from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SysUserLogs.
    **/
    skip?: number
    distinct?: Enumerable<SysUserLogScalarFieldEnum>
  }


  /**
   * SysUserLog create
   */
  export type SysUserLogCreateArgs = {
    /**
     * Select specific fields to fetch from the SysUserLog
    **/
    select?: SysUserLogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserLogInclude | null
    /**
     * The data needed to create a SysUserLog.
    **/
    data: SysUserLogCreateInput
  }


  /**
   * SysUserLog update
   */
  export type SysUserLogUpdateArgs = {
    /**
     * Select specific fields to fetch from the SysUserLog
    **/
    select?: SysUserLogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserLogInclude | null
    /**
     * The data needed to update a SysUserLog.
    **/
    data: SysUserLogUpdateInput
    /**
     * Choose, which SysUserLog to update.
    **/
    where: SysUserLogWhereUniqueInput
  }


  /**
   * SysUserLog updateMany
   */
  export type SysUserLogUpdateManyArgs = {
    data: SysUserLogUpdateManyMutationInput
    where?: SysUserLogWhereInput
  }


  /**
   * SysUserLog upsert
   */
  export type SysUserLogUpsertArgs = {
    /**
     * Select specific fields to fetch from the SysUserLog
    **/
    select?: SysUserLogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserLogInclude | null
    /**
     * The filter to search for the SysUserLog to update in case it exists.
    **/
    where: SysUserLogWhereUniqueInput
    /**
     * In case the SysUserLog found by the `where` argument doesn't exist, create a new SysUserLog with this data.
    **/
    create: SysUserLogCreateInput
    /**
     * In case the SysUserLog was found with the provided `where` argument, update it with this data.
    **/
    update: SysUserLogUpdateInput
  }


  /**
   * SysUserLog delete
   */
  export type SysUserLogDeleteArgs = {
    /**
     * Select specific fields to fetch from the SysUserLog
    **/
    select?: SysUserLogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserLogInclude | null
    /**
     * Filter which SysUserLog to delete.
    **/
    where: SysUserLogWhereUniqueInput
  }


  /**
   * SysUserLog deleteMany
   */
  export type SysUserLogDeleteManyArgs = {
    where?: SysUserLogWhereInput
  }


  /**
   * SysUserLog without action
   */
  export type SysUserLogArgs = {
    /**
     * Select specific fields to fetch from the SysUserLog
    **/
    select?: SysUserLogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserLogInclude | null
  }



  /**
   * Model SysUserIdentityCertification
   */


  export type AggregateSysUserIdentityCertification = {
    count: number | null
    avg: SysUserIdentityCertificationAvgAggregateOutputType | null
    sum: SysUserIdentityCertificationSumAggregateOutputType | null
    min: SysUserIdentityCertificationMinAggregateOutputType | null
    max: SysUserIdentityCertificationMaxAggregateOutputType | null
  }

  export type SysUserIdentityCertificationAvgAggregateOutputType = {
    id: number
    idCardType: number
    checkStatus: number
    sysUserId: number
  }

  export type SysUserIdentityCertificationSumAggregateOutputType = {
    id: number
    idCardType: number
    checkStatus: number
    sysUserId: number
  }

  export type SysUserIdentityCertificationMinAggregateOutputType = {
    id: number
    realName: string | null
    idCardType: number
    idCardNo: string | null
    idCardFrontImage: string | null
    idCardBackImage: string | null
    holdIDCardImage: string | null
    checkStatus: number
    reason: string | null
    createdAt: Date | null
    updatedAt: Date | null
    sysUserId: number
  }

  export type SysUserIdentityCertificationMaxAggregateOutputType = {
    id: number
    realName: string | null
    idCardType: number
    idCardNo: string | null
    idCardFrontImage: string | null
    idCardBackImage: string | null
    holdIDCardImage: string | null
    checkStatus: number
    reason: string | null
    createdAt: Date | null
    updatedAt: Date | null
    sysUserId: number
  }

  export type SysUserIdentityCertificationCountAggregateOutputType = {
    id: number
    realName: number | null
    idCardType: number
    idCardNo: number | null
    idCardFrontImage: number | null
    idCardBackImage: number | null
    holdIDCardImage: number | null
    checkStatus: number
    reason: number | null
    createdAt: number | null
    updatedAt: number | null
    sysUserId: number
    _all: number
  }


  export type SysUserIdentityCertificationAvgAggregateInputType = {
    id?: true
    idCardType?: true
    checkStatus?: true
    sysUserId?: true
  }

  export type SysUserIdentityCertificationSumAggregateInputType = {
    id?: true
    idCardType?: true
    checkStatus?: true
    sysUserId?: true
  }

  export type SysUserIdentityCertificationMinAggregateInputType = {
    id?: true
    realName?: true
    idCardType?: true
    idCardNo?: true
    idCardFrontImage?: true
    idCardBackImage?: true
    holdIDCardImage?: true
    checkStatus?: true
    reason?: true
    createdAt?: true
    updatedAt?: true
    sysUserId?: true
  }

  export type SysUserIdentityCertificationMaxAggregateInputType = {
    id?: true
    realName?: true
    idCardType?: true
    idCardNo?: true
    idCardFrontImage?: true
    idCardBackImage?: true
    holdIDCardImage?: true
    checkStatus?: true
    reason?: true
    createdAt?: true
    updatedAt?: true
    sysUserId?: true
  }

  export type SysUserIdentityCertificationCountAggregateInputType = {
    id?: true
    realName?: true
    idCardType?: true
    idCardNo?: true
    idCardFrontImage?: true
    idCardBackImage?: true
    holdIDCardImage?: true
    checkStatus?: true
    reason?: true
    createdAt?: true
    updatedAt?: true
    sysUserId?: true
    _all?: true
  }

  export type AggregateSysUserIdentityCertificationArgs = {
    /**
     * Filter which SysUserIdentityCertification to aggregate.
    **/
    where?: SysUserIdentityCertificationWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of SysUserIdentityCertifications to fetch.
    **/
    orderBy?: Enumerable<SysUserIdentityCertificationOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: SysUserIdentityCertificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SysUserIdentityCertifications from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SysUserIdentityCertifications.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SysUserIdentityCertifications
    **/
    count?: true
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: SysUserIdentityCertificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: SysUserIdentityCertificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: SysUserIdentityCertificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: SysUserIdentityCertificationMaxAggregateInputType
  }

  export type GetSysUserIdentityCertificationAggregateType<T extends AggregateSysUserIdentityCertificationArgs> = {
    [P in keyof T]: P extends 'count' ? number : GetSysUserIdentityCertificationAggregateScalarType<T[P]>
  }

  export type GetSysUserIdentityCertificationAggregateScalarType<T extends any> = {
    [P in keyof T]: P extends keyof SysUserIdentityCertificationAvgAggregateOutputType ? SysUserIdentityCertificationAvgAggregateOutputType[P] : never
  }

    



  export type SysUserIdentityCertificationSelect = {
    id?: boolean
    realName?: boolean
    idCardType?: boolean
    idCardNo?: boolean
    idCardFrontImage?: boolean
    idCardBackImage?: boolean
    holdIDCardImage?: boolean
    checkStatus?: boolean
    reason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sysUserId?: boolean
    SysUser?: boolean | SysUserArgs
  }

  export type SysUserIdentityCertificationInclude = {
    SysUser?: boolean | SysUserArgs
  }

  export type SysUserIdentityCertificationGetPayload<
    S extends boolean | null | undefined | SysUserIdentityCertificationArgs,
    U = keyof S
      > = S extends true
        ? SysUserIdentityCertification
    : S extends undefined
    ? never
    : S extends SysUserIdentityCertificationArgs | FindManySysUserIdentityCertificationArgs
    ?'include' extends U
    ? SysUserIdentityCertification  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'SysUser'
        ? SysUserGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof SysUserIdentityCertification ?SysUserIdentityCertification [P]
  : 
          P extends 'SysUser'
        ? SysUserGetPayload<S['select'][P]> : never
  } 
    : SysUserIdentityCertification
  : SysUserIdentityCertification


  export interface SysUserIdentityCertificationDelegate {
    /**
     * Find zero or one SysUserIdentityCertification that matches the filter.
     * @param {FindUniqueSysUserIdentityCertificationArgs} args - Arguments to find a SysUserIdentityCertification
     * @example
     * // Get one SysUserIdentityCertification
     * const sysUserIdentityCertification = await prisma.sysUserIdentityCertification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FindUniqueSysUserIdentityCertificationArgs>(
      args: Subset<T, FindUniqueSysUserIdentityCertificationArgs>
    ): CheckSelect<T, Prisma__SysUserIdentityCertificationClient<SysUserIdentityCertification | null>, Prisma__SysUserIdentityCertificationClient<SysUserIdentityCertificationGetPayload<T> | null>>

    /**
     * Find the first SysUserIdentityCertification that matches the filter.
     * @param {FindFirstSysUserIdentityCertificationArgs} args - Arguments to find a SysUserIdentityCertification
     * @example
     * // Get one SysUserIdentityCertification
     * const sysUserIdentityCertification = await prisma.sysUserIdentityCertification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FindFirstSysUserIdentityCertificationArgs>(
      args?: Subset<T, FindFirstSysUserIdentityCertificationArgs>
    ): CheckSelect<T, Prisma__SysUserIdentityCertificationClient<SysUserIdentityCertification | null>, Prisma__SysUserIdentityCertificationClient<SysUserIdentityCertificationGetPayload<T> | null>>

    /**
     * Find zero or more SysUserIdentityCertifications that matches the filter.
     * @param {FindManySysUserIdentityCertificationArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SysUserIdentityCertifications
     * const sysUserIdentityCertifications = await prisma.sysUserIdentityCertification.findMany()
     * 
     * // Get first 10 SysUserIdentityCertifications
     * const sysUserIdentityCertifications = await prisma.sysUserIdentityCertification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sysUserIdentityCertificationWithIdOnly = await prisma.sysUserIdentityCertification.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FindManySysUserIdentityCertificationArgs>(
      args?: Subset<T, FindManySysUserIdentityCertificationArgs>
    ): CheckSelect<T, Promise<Array<SysUserIdentityCertification>>, Promise<Array<SysUserIdentityCertificationGetPayload<T>>>>

    /**
     * Create a SysUserIdentityCertification.
     * @param {SysUserIdentityCertificationCreateArgs} args - Arguments to create a SysUserIdentityCertification.
     * @example
     * // Create one SysUserIdentityCertification
     * const SysUserIdentityCertification = await prisma.sysUserIdentityCertification.create({
     *   data: {
     *     // ... data to create a SysUserIdentityCertification
     *   }
     * })
     * 
    **/
    create<T extends SysUserIdentityCertificationCreateArgs>(
      args: Subset<T, SysUserIdentityCertificationCreateArgs>
    ): CheckSelect<T, Prisma__SysUserIdentityCertificationClient<SysUserIdentityCertification>, Prisma__SysUserIdentityCertificationClient<SysUserIdentityCertificationGetPayload<T>>>

    /**
     * Delete a SysUserIdentityCertification.
     * @param {SysUserIdentityCertificationDeleteArgs} args - Arguments to delete one SysUserIdentityCertification.
     * @example
     * // Delete one SysUserIdentityCertification
     * const SysUserIdentityCertification = await prisma.sysUserIdentityCertification.delete({
     *   where: {
     *     // ... filter to delete one SysUserIdentityCertification
     *   }
     * })
     * 
    **/
    delete<T extends SysUserIdentityCertificationDeleteArgs>(
      args: Subset<T, SysUserIdentityCertificationDeleteArgs>
    ): CheckSelect<T, Prisma__SysUserIdentityCertificationClient<SysUserIdentityCertification>, Prisma__SysUserIdentityCertificationClient<SysUserIdentityCertificationGetPayload<T>>>

    /**
     * Update one SysUserIdentityCertification.
     * @param {SysUserIdentityCertificationUpdateArgs} args - Arguments to update one SysUserIdentityCertification.
     * @example
     * // Update one SysUserIdentityCertification
     * const sysUserIdentityCertification = await prisma.sysUserIdentityCertification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SysUserIdentityCertificationUpdateArgs>(
      args: Subset<T, SysUserIdentityCertificationUpdateArgs>
    ): CheckSelect<T, Prisma__SysUserIdentityCertificationClient<SysUserIdentityCertification>, Prisma__SysUserIdentityCertificationClient<SysUserIdentityCertificationGetPayload<T>>>

    /**
     * Delete zero or more SysUserIdentityCertifications.
     * @param {SysUserIdentityCertificationDeleteManyArgs} args - Arguments to filter SysUserIdentityCertifications to delete.
     * @example
     * // Delete a few SysUserIdentityCertifications
     * const { count } = await prisma.sysUserIdentityCertification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SysUserIdentityCertificationDeleteManyArgs>(
      args?: Subset<T, SysUserIdentityCertificationDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more SysUserIdentityCertifications.
     * @param {SysUserIdentityCertificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SysUserIdentityCertifications
     * const sysUserIdentityCertification = await prisma.sysUserIdentityCertification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SysUserIdentityCertificationUpdateManyArgs>(
      args: Subset<T, SysUserIdentityCertificationUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one SysUserIdentityCertification.
     * @param {SysUserIdentityCertificationUpsertArgs} args - Arguments to update or create a SysUserIdentityCertification.
     * @example
     * // Update or create a SysUserIdentityCertification
     * const sysUserIdentityCertification = await prisma.sysUserIdentityCertification.upsert({
     *   create: {
     *     // ... data to create a SysUserIdentityCertification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SysUserIdentityCertification we want to update
     *   }
     * })
    **/
    upsert<T extends SysUserIdentityCertificationUpsertArgs>(
      args: Subset<T, SysUserIdentityCertificationUpsertArgs>
    ): CheckSelect<T, Prisma__SysUserIdentityCertificationClient<SysUserIdentityCertification>, Prisma__SysUserIdentityCertificationClient<SysUserIdentityCertificationGetPayload<T>>>

    /**
     * Find zero or one SysUserIdentityCertification that matches the filter.
     * @param {FindUniqueSysUserIdentityCertificationArgs} args - Arguments to find a SysUserIdentityCertification
     * @deprecated This will be deprecated please use prisma.sysUserIdentityCertification.findUnique
     * @example
     * // Get one SysUserIdentityCertification
     * const sysUserIdentityCertification = await prisma.sysUserIdentityCertification.findOne({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findOne<T extends FindUniqueSysUserIdentityCertificationArgs>(
      args: Subset<T, FindUniqueSysUserIdentityCertificationArgs>
    ): CheckSelect<T, Prisma__SysUserIdentityCertificationClient<SysUserIdentityCertification | null>, Prisma__SysUserIdentityCertificationClient<SysUserIdentityCertificationGetPayload<T> | null>>

    /**
     * Count the number of SysUserIdentityCertifications.
     * @param {FindManySysUserIdentityCertificationArgs} args - Arguments to filter SysUserIdentityCertifications to count.
     * @example
     * // Count the number of SysUserIdentityCertifications
     * const count = await prisma.sysUserIdentityCertification.count({
     *   where: {
     *     // ... the filter for the SysUserIdentityCertifications we want to count
     *   }
     * })
    **/
    count(args?: Omit<FindManySysUserIdentityCertificationArgs, 'select' | 'include'>): Promise<number>

    /**
     * Allows you to perform aggregations operations on a SysUserIdentityCertification.
     * @param {AggregateSysUserIdentityCertificationArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AggregateSysUserIdentityCertificationArgs>(args: Subset<T, AggregateSysUserIdentityCertificationArgs>): Promise<GetSysUserIdentityCertificationAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for SysUserIdentityCertification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SysUserIdentityCertificationClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    SysUser<T extends SysUserArgs = {}>(args?: Subset<T, SysUserArgs>): CheckSelect<T, Prisma__SysUserClient<SysUser | null>, Prisma__SysUserClient<SysUserGetPayload<T> | null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * SysUserIdentityCertification findUnique
   */
  export type FindUniqueSysUserIdentityCertificationArgs = {
    /**
     * Select specific fields to fetch from the SysUserIdentityCertification
    **/
    select?: SysUserIdentityCertificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserIdentityCertificationInclude | null
    /**
     * Filter, which SysUserIdentityCertification to fetch.
    **/
    where: SysUserIdentityCertificationWhereUniqueInput
  }


  /**
   * SysUserIdentityCertification findFirst
   */
  export type FindFirstSysUserIdentityCertificationArgs = {
    /**
     * Select specific fields to fetch from the SysUserIdentityCertification
    **/
    select?: SysUserIdentityCertificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserIdentityCertificationInclude | null
    /**
     * Filter, which SysUserIdentityCertification to fetch.
    **/
    where?: SysUserIdentityCertificationWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of SysUserIdentityCertifications to fetch.
    **/
    orderBy?: Enumerable<SysUserIdentityCertificationOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SysUserIdentityCertifications.
    **/
    cursor?: SysUserIdentityCertificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SysUserIdentityCertifications from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SysUserIdentityCertifications.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of SysUserIdentityCertifications.
    **/
    distinct?: Enumerable<SysUserIdentityCertificationScalarFieldEnum>
  }


  /**
   * SysUserIdentityCertification findMany
   */
  export type FindManySysUserIdentityCertificationArgs = {
    /**
     * Select specific fields to fetch from the SysUserIdentityCertification
    **/
    select?: SysUserIdentityCertificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserIdentityCertificationInclude | null
    /**
     * Filter, which SysUserIdentityCertifications to fetch.
    **/
    where?: SysUserIdentityCertificationWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of SysUserIdentityCertifications to fetch.
    **/
    orderBy?: Enumerable<SysUserIdentityCertificationOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SysUserIdentityCertifications.
    **/
    cursor?: SysUserIdentityCertificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SysUserIdentityCertifications from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SysUserIdentityCertifications.
    **/
    skip?: number
    distinct?: Enumerable<SysUserIdentityCertificationScalarFieldEnum>
  }


  /**
   * SysUserIdentityCertification create
   */
  export type SysUserIdentityCertificationCreateArgs = {
    /**
     * Select specific fields to fetch from the SysUserIdentityCertification
    **/
    select?: SysUserIdentityCertificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserIdentityCertificationInclude | null
    /**
     * The data needed to create a SysUserIdentityCertification.
    **/
    data: SysUserIdentityCertificationCreateInput
  }


  /**
   * SysUserIdentityCertification update
   */
  export type SysUserIdentityCertificationUpdateArgs = {
    /**
     * Select specific fields to fetch from the SysUserIdentityCertification
    **/
    select?: SysUserIdentityCertificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserIdentityCertificationInclude | null
    /**
     * The data needed to update a SysUserIdentityCertification.
    **/
    data: SysUserIdentityCertificationUpdateInput
    /**
     * Choose, which SysUserIdentityCertification to update.
    **/
    where: SysUserIdentityCertificationWhereUniqueInput
  }


  /**
   * SysUserIdentityCertification updateMany
   */
  export type SysUserIdentityCertificationUpdateManyArgs = {
    data: SysUserIdentityCertificationUpdateManyMutationInput
    where?: SysUserIdentityCertificationWhereInput
  }


  /**
   * SysUserIdentityCertification upsert
   */
  export type SysUserIdentityCertificationUpsertArgs = {
    /**
     * Select specific fields to fetch from the SysUserIdentityCertification
    **/
    select?: SysUserIdentityCertificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserIdentityCertificationInclude | null
    /**
     * The filter to search for the SysUserIdentityCertification to update in case it exists.
    **/
    where: SysUserIdentityCertificationWhereUniqueInput
    /**
     * In case the SysUserIdentityCertification found by the `where` argument doesn't exist, create a new SysUserIdentityCertification with this data.
    **/
    create: SysUserIdentityCertificationCreateInput
    /**
     * In case the SysUserIdentityCertification was found with the provided `where` argument, update it with this data.
    **/
    update: SysUserIdentityCertificationUpdateInput
  }


  /**
   * SysUserIdentityCertification delete
   */
  export type SysUserIdentityCertificationDeleteArgs = {
    /**
     * Select specific fields to fetch from the SysUserIdentityCertification
    **/
    select?: SysUserIdentityCertificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserIdentityCertificationInclude | null
    /**
     * Filter which SysUserIdentityCertification to delete.
    **/
    where: SysUserIdentityCertificationWhereUniqueInput
  }


  /**
   * SysUserIdentityCertification deleteMany
   */
  export type SysUserIdentityCertificationDeleteManyArgs = {
    where?: SysUserIdentityCertificationWhereInput
  }


  /**
   * SysUserIdentityCertification without action
   */
  export type SysUserIdentityCertificationArgs = {
    /**
     * Select specific fields to fetch from the SysUserIdentityCertification
    **/
    select?: SysUserIdentityCertificationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: SysUserIdentityCertificationInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const SysUserScalarFieldEnum: {
    id: 'id',
    uid: 'uid',
    avatar: 'avatar',
    nickname: 'nickname',
    gender: 'gender',
    birthday: 'birthday',
    username: 'username',
    password: 'password',
    verified: 'verified',
    mobile: 'mobile',
    email: 'email',
    isDeleted: 'isDeleted',
    isLocked: 'isLocked',
    isAdmin: 'isAdmin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type SysUserScalarFieldEnum = (typeof SysUserScalarFieldEnum)[keyof typeof SysUserScalarFieldEnum]


  export const SysUserLogScalarFieldEnum: {
    id: 'id',
    category: 'category',
    level: 'level',
    action: 'action',
    message: 'message',
    details: 'details',
    userAgent: 'userAgent',
    clientIp: 'clientIp',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    sysUserId: 'sysUserId'
  };

  export type SysUserLogScalarFieldEnum = (typeof SysUserLogScalarFieldEnum)[keyof typeof SysUserLogScalarFieldEnum]


  export const SysUserIdentityCertificationScalarFieldEnum: {
    id: 'id',
    realName: 'realName',
    idCardType: 'idCardType',
    idCardNo: 'idCardNo',
    idCardFrontImage: 'idCardFrontImage',
    idCardBackImage: 'idCardBackImage',
    holdIDCardImage: 'holdIDCardImage',
    checkStatus: 'checkStatus',
    reason: 'reason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    sysUserId: 'sysUserId'
  };

  export type SysUserIdentityCertificationScalarFieldEnum = (typeof SysUserIdentityCertificationScalarFieldEnum)[keyof typeof SysUserIdentityCertificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type SysUserWhereInput = {
    AND?: Enumerable<SysUserWhereInput>
    OR?: Enumerable<SysUserWhereInput>
    NOT?: Enumerable<SysUserWhereInput>
    id?: IntFilter | number
    uid?: StringFilter | string
    avatar?: StringNullableFilter | string | null
    nickname?: StringNullableFilter | string | null
    gender?: IntFilter | number
    birthday?: StringNullableFilter | string | null
    username?: StringNullableFilter | string | null
    password?: StringNullableFilter | string | null
    verified?: BoolFilter | boolean
    mobile?: StringNullableFilter | string | null
    email?: StringNullableFilter | string | null
    isDeleted?: BoolFilter | boolean
    isLocked?: BoolFilter | boolean
    isAdmin?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeNullableFilter | Date | string | null
    deletedAt?: DateTimeNullableFilter | Date | string | null
    SysUserLogs?: SysUserLogListRelationFilter
    SysUserIdentityCertification?: XOR<SysUserIdentityCertificationWhereInput, SysUserIdentityCertificationRelationFilter> | null
  }

  export type SysUserOrderByInput = {
    id?: SortOrder
    uid?: SortOrder
    avatar?: SortOrder
    nickname?: SortOrder
    gender?: SortOrder
    birthday?: SortOrder
    username?: SortOrder
    password?: SortOrder
    verified?: SortOrder
    mobile?: SortOrder
    email?: SortOrder
    isDeleted?: SortOrder
    isLocked?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type SysUserWhereUniqueInput = {
    id?: number
    uid?: string
  }

  export type SysUserLogWhereInput = {
    AND?: Enumerable<SysUserLogWhereInput>
    OR?: Enumerable<SysUserLogWhereInput>
    NOT?: Enumerable<SysUserLogWhereInput>
    id?: IntFilter | number
    category?: StringFilter | string
    level?: StringFilter | string
    action?: StringFilter | string
    message?: StringFilter | string
    details?: StringNullableFilter | string | null
    userAgent?: StringFilter | string
    clientIp?: StringFilter | string
    createdBy?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    sysUserId?: IntFilter | number
    SysUser?: XOR<SysUserWhereInput, SysUserRelationFilter>
  }

  export type SysUserLogOrderByInput = {
    id?: SortOrder
    category?: SortOrder
    level?: SortOrder
    action?: SortOrder
    message?: SortOrder
    details?: SortOrder
    userAgent?: SortOrder
    clientIp?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    sysUserId?: SortOrder
  }

  export type SysUserLogWhereUniqueInput = {
    id?: number
  }

  export type SysUserIdentityCertificationWhereInput = {
    AND?: Enumerable<SysUserIdentityCertificationWhereInput>
    OR?: Enumerable<SysUserIdentityCertificationWhereInput>
    NOT?: Enumerable<SysUserIdentityCertificationWhereInput>
    id?: IntFilter | number
    realName?: StringFilter | string
    idCardType?: IntFilter | number
    idCardNo?: StringFilter | string
    idCardFrontImage?: StringFilter | string
    idCardBackImage?: StringFilter | string
    holdIDCardImage?: StringFilter | string
    checkStatus?: IntFilter | number
    reason?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeNullableFilter | Date | string | null
    sysUserId?: IntFilter | number
    SysUser?: XOR<SysUserWhereInput, SysUserRelationFilter>
  }

  export type SysUserIdentityCertificationOrderByInput = {
    id?: SortOrder
    realName?: SortOrder
    idCardType?: SortOrder
    idCardNo?: SortOrder
    idCardFrontImage?: SortOrder
    idCardBackImage?: SortOrder
    holdIDCardImage?: SortOrder
    checkStatus?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sysUserId?: SortOrder
  }

  export type SysUserIdentityCertificationWhereUniqueInput = {
    id?: number
  }

  export type SysUserCreateInput = {
    uid?: string
    avatar?: string | null
    nickname?: string | null
    gender?: number
    birthday?: string | null
    username?: string | null
    password?: string | null
    verified?: boolean
    mobile?: string | null
    email?: string | null
    isDeleted?: boolean
    isLocked?: boolean
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    SysUserLogs?: SysUserLogCreateManyWithoutSysUserInput
    SysUserIdentityCertification?: SysUserIdentityCertificationCreateOneWithoutSysUserInput
  }

  export type SysUserUpdateInput = {
    uid?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: IntFieldUpdateOperationsInput | number
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    SysUserLogs?: SysUserLogUpdateManyWithoutSysUserInput
    SysUserIdentityCertification?: SysUserIdentityCertificationUpdateOneWithoutSysUserInput
  }

  export type SysUserUpdateManyMutationInput = {
    uid?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: IntFieldUpdateOperationsInput | number
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SysUserLogCreateInput = {
    category?: string
    level?: string
    action: string
    message: string
    details?: string | null
    userAgent: string
    clientIp: string
    createdBy?: number
    createdAt?: Date | string
    SysUser: SysUserCreateOneWithoutSysUserLogsInput
  }

  export type SysUserLogUpdateInput = {
    category?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: StringFieldUpdateOperationsInput | string
    clientIp?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    SysUser?: SysUserUpdateOneRequiredWithoutSysUserLogsInput
  }

  export type SysUserLogUpdateManyMutationInput = {
    category?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: StringFieldUpdateOperationsInput | string
    clientIp?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SysUserIdentityCertificationCreateInput = {
    realName: string
    idCardType: number
    idCardNo: string
    idCardFrontImage: string
    idCardBackImage: string
    holdIDCardImage: string
    checkStatus?: number
    reason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    SysUser: SysUserCreateOneWithoutSysUserIdentityCertificationInput
  }

  export type SysUserIdentityCertificationUpdateInput = {
    realName?: StringFieldUpdateOperationsInput | string
    idCardType?: IntFieldUpdateOperationsInput | number
    idCardNo?: StringFieldUpdateOperationsInput | string
    idCardFrontImage?: StringFieldUpdateOperationsInput | string
    idCardBackImage?: StringFieldUpdateOperationsInput | string
    holdIDCardImage?: StringFieldUpdateOperationsInput | string
    checkStatus?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    SysUser?: SysUserUpdateOneRequiredWithoutSysUserIdentityCertificationInput
  }

  export type SysUserIdentityCertificationUpdateManyMutationInput = {
    realName?: StringFieldUpdateOperationsInput | string
    idCardType?: IntFieldUpdateOperationsInput | number
    idCardNo?: StringFieldUpdateOperationsInput | string
    idCardFrontImage?: StringFieldUpdateOperationsInput | string
    idCardBackImage?: StringFieldUpdateOperationsInput | string
    holdIDCardImage?: StringFieldUpdateOperationsInput | string
    checkStatus?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type SysUserLogListRelationFilter = {
    every?: SysUserLogWhereInput
    some?: SysUserLogWhereInput
    none?: SysUserLogWhereInput
  }

  export type SysUserIdentityCertificationRelationFilter = {
    is?: SysUserIdentityCertificationWhereInput | null
    isNot?: SysUserIdentityCertificationWhereInput | null
  }

  export type SysUserRelationFilter = {
    is?: SysUserWhereInput
    isNot?: SysUserWhereInput
  }

  export type SysUserLogCreateManyWithoutSysUserInput = {
    create?: Enumerable<SysUserLogCreateWithoutSysUserInput>
    connect?: Enumerable<SysUserLogWhereUniqueInput>
    connectOrCreate?: Enumerable<SysUserLogCreateOrConnectWithoutSysUserInput>
  }

  export type SysUserIdentityCertificationCreateOneWithoutSysUserInput = {
    create?: SysUserIdentityCertificationCreateWithoutSysUserInput
    connect?: SysUserIdentityCertificationWhereUniqueInput
    connectOrCreate?: SysUserIdentityCertificationCreateOrConnectWithoutSysUserInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type SysUserLogUpdateManyWithoutSysUserInput = {
    create?: Enumerable<SysUserLogCreateWithoutSysUserInput>
    connect?: Enumerable<SysUserLogWhereUniqueInput>
    set?: Enumerable<SysUserLogWhereUniqueInput>
    disconnect?: Enumerable<SysUserLogWhereUniqueInput>
    delete?: Enumerable<SysUserLogWhereUniqueInput>
    update?: Enumerable<SysUserLogUpdateWithWhereUniqueWithoutSysUserInput>
    updateMany?: Enumerable<SysUserLogUpdateManyWithWhereWithoutSysUserInput>
    deleteMany?: Enumerable<SysUserLogScalarWhereInput>
    upsert?: Enumerable<SysUserLogUpsertWithWhereUniqueWithoutSysUserInput>
    connectOrCreate?: Enumerable<SysUserLogCreateOrConnectWithoutSysUserInput>
  }

  export type SysUserIdentityCertificationUpdateOneWithoutSysUserInput = {
    create?: SysUserIdentityCertificationCreateWithoutSysUserInput
    connect?: SysUserIdentityCertificationWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: SysUserIdentityCertificationUpdateWithoutSysUserInput
    upsert?: SysUserIdentityCertificationUpsertWithoutSysUserInput
    connectOrCreate?: SysUserIdentityCertificationCreateOrConnectWithoutSysUserInput
  }

  export type SysUserCreateOneWithoutSysUserLogsInput = {
    create?: SysUserCreateWithoutSysUserLogsInput
    connect?: SysUserWhereUniqueInput
    connectOrCreate?: SysUserCreateOrConnectWithoutSysUserLogsInput
  }

  export type SysUserUpdateOneRequiredWithoutSysUserLogsInput = {
    create?: SysUserCreateWithoutSysUserLogsInput
    connect?: SysUserWhereUniqueInput
    update?: SysUserUpdateWithoutSysUserLogsInput
    upsert?: SysUserUpsertWithoutSysUserLogsInput
    connectOrCreate?: SysUserCreateOrConnectWithoutSysUserLogsInput
  }

  export type SysUserCreateOneWithoutSysUserIdentityCertificationInput = {
    create?: SysUserCreateWithoutSysUserIdentityCertificationInput
    connect?: SysUserWhereUniqueInput
    connectOrCreate?: SysUserCreateOrConnectWithoutSysUserIdentityCertificationInput
  }

  export type SysUserUpdateOneRequiredWithoutSysUserIdentityCertificationInput = {
    create?: SysUserCreateWithoutSysUserIdentityCertificationInput
    connect?: SysUserWhereUniqueInput
    update?: SysUserUpdateWithoutSysUserIdentityCertificationInput
    upsert?: SysUserUpsertWithoutSysUserIdentityCertificationInput
    connectOrCreate?: SysUserCreateOrConnectWithoutSysUserIdentityCertificationInput
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type SysUserLogCreateWithoutSysUserInput = {
    category?: string
    level?: string
    action: string
    message: string
    details?: string | null
    userAgent: string
    clientIp: string
    createdBy?: number
    createdAt?: Date | string
  }

  export type SysUserLogCreateOrConnectWithoutSysUserInput = {
    where: SysUserLogWhereUniqueInput
    create: SysUserLogCreateWithoutSysUserInput
  }

  export type SysUserIdentityCertificationCreateWithoutSysUserInput = {
    realName: string
    idCardType: number
    idCardNo: string
    idCardFrontImage: string
    idCardBackImage: string
    holdIDCardImage: string
    checkStatus?: number
    reason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type SysUserIdentityCertificationCreateOrConnectWithoutSysUserInput = {
    where: SysUserIdentityCertificationWhereUniqueInput
    create: SysUserIdentityCertificationCreateWithoutSysUserInput
  }

  export type SysUserLogUpdateWithWhereUniqueWithoutSysUserInput = {
    where: SysUserLogWhereUniqueInput
    data: SysUserLogUpdateWithoutSysUserInput
  }

  export type SysUserLogUpdateManyWithWhereWithoutSysUserInput = {
    where: SysUserLogScalarWhereInput
    data: SysUserLogUpdateManyMutationInput
  }

  export type SysUserLogScalarWhereInput = {
    AND?: Enumerable<SysUserLogScalarWhereInput>
    OR?: Enumerable<SysUserLogScalarWhereInput>
    NOT?: Enumerable<SysUserLogScalarWhereInput>
    id?: IntFilter | number
    category?: StringFilter | string
    level?: StringFilter | string
    action?: StringFilter | string
    message?: StringFilter | string
    details?: StringNullableFilter | string | null
    userAgent?: StringFilter | string
    clientIp?: StringFilter | string
    createdBy?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    sysUserId?: IntFilter | number
  }

  export type SysUserLogUpsertWithWhereUniqueWithoutSysUserInput = {
    where: SysUserLogWhereUniqueInput
    update: SysUserLogUpdateWithoutSysUserInput
    create: SysUserLogCreateWithoutSysUserInput
  }

  export type SysUserIdentityCertificationUpdateWithoutSysUserInput = {
    realName?: StringFieldUpdateOperationsInput | string
    idCardType?: IntFieldUpdateOperationsInput | number
    idCardNo?: StringFieldUpdateOperationsInput | string
    idCardFrontImage?: StringFieldUpdateOperationsInput | string
    idCardBackImage?: StringFieldUpdateOperationsInput | string
    holdIDCardImage?: StringFieldUpdateOperationsInput | string
    checkStatus?: IntFieldUpdateOperationsInput | number
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SysUserIdentityCertificationUpsertWithoutSysUserInput = {
    update: SysUserIdentityCertificationUpdateWithoutSysUserInput
    create: SysUserIdentityCertificationCreateWithoutSysUserInput
  }

  export type SysUserCreateWithoutSysUserLogsInput = {
    uid?: string
    avatar?: string | null
    nickname?: string | null
    gender?: number
    birthday?: string | null
    username?: string | null
    password?: string | null
    verified?: boolean
    mobile?: string | null
    email?: string | null
    isDeleted?: boolean
    isLocked?: boolean
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    SysUserIdentityCertification?: SysUserIdentityCertificationCreateOneWithoutSysUserInput
  }

  export type SysUserCreateOrConnectWithoutSysUserLogsInput = {
    where: SysUserWhereUniqueInput
    create: SysUserCreateWithoutSysUserLogsInput
  }

  export type SysUserUpdateWithoutSysUserLogsInput = {
    uid?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: IntFieldUpdateOperationsInput | number
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    SysUserIdentityCertification?: SysUserIdentityCertificationUpdateOneWithoutSysUserInput
  }

  export type SysUserUpsertWithoutSysUserLogsInput = {
    update: SysUserUpdateWithoutSysUserLogsInput
    create: SysUserCreateWithoutSysUserLogsInput
  }

  export type SysUserCreateWithoutSysUserIdentityCertificationInput = {
    uid?: string
    avatar?: string | null
    nickname?: string | null
    gender?: number
    birthday?: string | null
    username?: string | null
    password?: string | null
    verified?: boolean
    mobile?: string | null
    email?: string | null
    isDeleted?: boolean
    isLocked?: boolean
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    SysUserLogs?: SysUserLogCreateManyWithoutSysUserInput
  }

  export type SysUserCreateOrConnectWithoutSysUserIdentityCertificationInput = {
    where: SysUserWhereUniqueInput
    create: SysUserCreateWithoutSysUserIdentityCertificationInput
  }

  export type SysUserUpdateWithoutSysUserIdentityCertificationInput = {
    uid?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: IntFieldUpdateOperationsInput | number
    birthday?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    SysUserLogs?: SysUserLogUpdateManyWithoutSysUserInput
  }

  export type SysUserUpsertWithoutSysUserIdentityCertificationInput = {
    update: SysUserUpdateWithoutSysUserIdentityCertificationInput
    create: SysUserCreateWithoutSysUserIdentityCertificationInput
  }

  export type SysUserLogUpdateWithoutSysUserInput = {
    category?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: StringFieldUpdateOperationsInput | string
    clientIp?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}

/*
* Exports for compatibility introduced in 2.12.0
* Please import from the Prisma namespace instead
*/

/**
 * @deprecated Renamed to `Prisma.SysUserScalarFieldEnum`
 */
export type SysUserScalarFieldEnum = Prisma.SysUserScalarFieldEnum

/**
 * @deprecated Renamed to `Prisma.SysUserLogScalarFieldEnum`
 */
export type SysUserLogScalarFieldEnum = Prisma.SysUserLogScalarFieldEnum

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationScalarFieldEnum`
 */
export type SysUserIdentityCertificationScalarFieldEnum = Prisma.SysUserIdentityCertificationScalarFieldEnum

/**
 * @deprecated Renamed to `Prisma.SortOrder`
 */
export type SortOrder = Prisma.SortOrder

/**
 * @deprecated Renamed to `Prisma.QueryMode`
 */
export type QueryMode = Prisma.QueryMode

/**
 * @deprecated Renamed to `Prisma.ModelName`
 */
export type ModelName = Prisma.ModelName

/**
 * @deprecated Renamed to `Prisma.AggregateSysUser`
 */
export type AggregateSysUser = Prisma.AggregateSysUser

/**
 * @deprecated Renamed to `Prisma.SysUserAvgAggregateOutputType`
 */
export type SysUserAvgAggregateOutputType = Prisma.SysUserAvgAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.SysUserSumAggregateOutputType`
 */
export type SysUserSumAggregateOutputType = Prisma.SysUserSumAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.SysUserMinAggregateOutputType`
 */
export type SysUserMinAggregateOutputType = Prisma.SysUserMinAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.SysUserMaxAggregateOutputType`
 */
export type SysUserMaxAggregateOutputType = Prisma.SysUserMaxAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.SysUserCountAggregateOutputType`
 */
export type SysUserCountAggregateOutputType = Prisma.SysUserCountAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.AggregateSysUserArgs`
 */
export type AggregateSysUserArgs = Prisma.AggregateSysUserArgs

/**
 * @deprecated Renamed to `Prisma.SysUserAvgAggregateInputType`
 */
export type SysUserAvgAggregateInputType = Prisma.SysUserAvgAggregateInputType

/**
 * @deprecated Renamed to `Prisma.SysUserSumAggregateInputType`
 */
export type SysUserSumAggregateInputType = Prisma.SysUserSumAggregateInputType

/**
 * @deprecated Renamed to `Prisma.SysUserMinAggregateInputType`
 */
export type SysUserMinAggregateInputType = Prisma.SysUserMinAggregateInputType

/**
 * @deprecated Renamed to `Prisma.SysUserMaxAggregateInputType`
 */
export type SysUserMaxAggregateInputType = Prisma.SysUserMaxAggregateInputType

/**
 * @deprecated Renamed to `Prisma.SysUserCountAggregateInputType`
 */
export type SysUserCountAggregateInputType = Prisma.SysUserCountAggregateInputType

/**
 * @deprecated Renamed to `Prisma.SysUserSelect`
 */
export type SysUserSelect = Prisma.SysUserSelect

/**
 * @deprecated Renamed to `Prisma.SysUserInclude`
 */
export type SysUserInclude = Prisma.SysUserInclude

/**
 * @deprecated Renamed to `Prisma.FindUniqueSysUserArgs`
 */
export type FindUniqueSysUserArgs = Prisma.FindUniqueSysUserArgs

/**
 * @deprecated Renamed to `Prisma.FindFirstSysUserArgs`
 */
export type FindFirstSysUserArgs = Prisma.FindFirstSysUserArgs

/**
 * @deprecated Renamed to `Prisma.FindManySysUserArgs`
 */
export type FindManySysUserArgs = Prisma.FindManySysUserArgs

/**
 * @deprecated Renamed to `Prisma.SysUserCreateArgs`
 */
export type SysUserCreateArgs = Prisma.SysUserCreateArgs

/**
 * @deprecated Renamed to `Prisma.SysUserUpdateArgs`
 */
export type SysUserUpdateArgs = Prisma.SysUserUpdateArgs

/**
 * @deprecated Renamed to `Prisma.SysUserUpdateManyArgs`
 */
export type SysUserUpdateManyArgs = Prisma.SysUserUpdateManyArgs

/**
 * @deprecated Renamed to `Prisma.SysUserUpsertArgs`
 */
export type SysUserUpsertArgs = Prisma.SysUserUpsertArgs

/**
 * @deprecated Renamed to `Prisma.SysUserDeleteArgs`
 */
export type SysUserDeleteArgs = Prisma.SysUserDeleteArgs

/**
 * @deprecated Renamed to `Prisma.SysUserDeleteManyArgs`
 */
export type SysUserDeleteManyArgs = Prisma.SysUserDeleteManyArgs

/**
 * @deprecated Renamed to `Prisma.AggregateSysUserLog`
 */
export type AggregateSysUserLog = Prisma.AggregateSysUserLog

/**
 * @deprecated Renamed to `Prisma.SysUserLogAvgAggregateOutputType`
 */
export type SysUserLogAvgAggregateOutputType = Prisma.SysUserLogAvgAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.SysUserLogSumAggregateOutputType`
 */
export type SysUserLogSumAggregateOutputType = Prisma.SysUserLogSumAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.SysUserLogMinAggregateOutputType`
 */
export type SysUserLogMinAggregateOutputType = Prisma.SysUserLogMinAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.SysUserLogMaxAggregateOutputType`
 */
export type SysUserLogMaxAggregateOutputType = Prisma.SysUserLogMaxAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.SysUserLogCountAggregateOutputType`
 */
export type SysUserLogCountAggregateOutputType = Prisma.SysUserLogCountAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.AggregateSysUserLogArgs`
 */
export type AggregateSysUserLogArgs = Prisma.AggregateSysUserLogArgs

/**
 * @deprecated Renamed to `Prisma.SysUserLogAvgAggregateInputType`
 */
export type SysUserLogAvgAggregateInputType = Prisma.SysUserLogAvgAggregateInputType

/**
 * @deprecated Renamed to `Prisma.SysUserLogSumAggregateInputType`
 */
export type SysUserLogSumAggregateInputType = Prisma.SysUserLogSumAggregateInputType

/**
 * @deprecated Renamed to `Prisma.SysUserLogMinAggregateInputType`
 */
export type SysUserLogMinAggregateInputType = Prisma.SysUserLogMinAggregateInputType

/**
 * @deprecated Renamed to `Prisma.SysUserLogMaxAggregateInputType`
 */
export type SysUserLogMaxAggregateInputType = Prisma.SysUserLogMaxAggregateInputType

/**
 * @deprecated Renamed to `Prisma.SysUserLogCountAggregateInputType`
 */
export type SysUserLogCountAggregateInputType = Prisma.SysUserLogCountAggregateInputType

/**
 * @deprecated Renamed to `Prisma.SysUserLogSelect`
 */
export type SysUserLogSelect = Prisma.SysUserLogSelect

/**
 * @deprecated Renamed to `Prisma.SysUserLogInclude`
 */
export type SysUserLogInclude = Prisma.SysUserLogInclude

/**
 * @deprecated Renamed to `Prisma.FindUniqueSysUserLogArgs`
 */
export type FindUniqueSysUserLogArgs = Prisma.FindUniqueSysUserLogArgs

/**
 * @deprecated Renamed to `Prisma.FindFirstSysUserLogArgs`
 */
export type FindFirstSysUserLogArgs = Prisma.FindFirstSysUserLogArgs

/**
 * @deprecated Renamed to `Prisma.FindManySysUserLogArgs`
 */
export type FindManySysUserLogArgs = Prisma.FindManySysUserLogArgs

/**
 * @deprecated Renamed to `Prisma.SysUserLogCreateArgs`
 */
export type SysUserLogCreateArgs = Prisma.SysUserLogCreateArgs

/**
 * @deprecated Renamed to `Prisma.SysUserLogUpdateArgs`
 */
export type SysUserLogUpdateArgs = Prisma.SysUserLogUpdateArgs

/**
 * @deprecated Renamed to `Prisma.SysUserLogUpdateManyArgs`
 */
export type SysUserLogUpdateManyArgs = Prisma.SysUserLogUpdateManyArgs

/**
 * @deprecated Renamed to `Prisma.SysUserLogUpsertArgs`
 */
export type SysUserLogUpsertArgs = Prisma.SysUserLogUpsertArgs

/**
 * @deprecated Renamed to `Prisma.SysUserLogDeleteArgs`
 */
export type SysUserLogDeleteArgs = Prisma.SysUserLogDeleteArgs

/**
 * @deprecated Renamed to `Prisma.SysUserLogDeleteManyArgs`
 */
export type SysUserLogDeleteManyArgs = Prisma.SysUserLogDeleteManyArgs

/**
 * @deprecated Renamed to `Prisma.AggregateSysUserIdentityCertification`
 */
export type AggregateSysUserIdentityCertification = Prisma.AggregateSysUserIdentityCertification

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationAvgAggregateOutputType`
 */
export type SysUserIdentityCertificationAvgAggregateOutputType = Prisma.SysUserIdentityCertificationAvgAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationSumAggregateOutputType`
 */
export type SysUserIdentityCertificationSumAggregateOutputType = Prisma.SysUserIdentityCertificationSumAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationMinAggregateOutputType`
 */
export type SysUserIdentityCertificationMinAggregateOutputType = Prisma.SysUserIdentityCertificationMinAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationMaxAggregateOutputType`
 */
export type SysUserIdentityCertificationMaxAggregateOutputType = Prisma.SysUserIdentityCertificationMaxAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationCountAggregateOutputType`
 */
export type SysUserIdentityCertificationCountAggregateOutputType = Prisma.SysUserIdentityCertificationCountAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.AggregateSysUserIdentityCertificationArgs`
 */
export type AggregateSysUserIdentityCertificationArgs = Prisma.AggregateSysUserIdentityCertificationArgs

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationAvgAggregateInputType`
 */
export type SysUserIdentityCertificationAvgAggregateInputType = Prisma.SysUserIdentityCertificationAvgAggregateInputType

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationSumAggregateInputType`
 */
export type SysUserIdentityCertificationSumAggregateInputType = Prisma.SysUserIdentityCertificationSumAggregateInputType

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationMinAggregateInputType`
 */
export type SysUserIdentityCertificationMinAggregateInputType = Prisma.SysUserIdentityCertificationMinAggregateInputType

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationMaxAggregateInputType`
 */
export type SysUserIdentityCertificationMaxAggregateInputType = Prisma.SysUserIdentityCertificationMaxAggregateInputType

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationCountAggregateInputType`
 */
export type SysUserIdentityCertificationCountAggregateInputType = Prisma.SysUserIdentityCertificationCountAggregateInputType

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationSelect`
 */
export type SysUserIdentityCertificationSelect = Prisma.SysUserIdentityCertificationSelect

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationInclude`
 */
export type SysUserIdentityCertificationInclude = Prisma.SysUserIdentityCertificationInclude

/**
 * @deprecated Renamed to `Prisma.FindUniqueSysUserIdentityCertificationArgs`
 */
export type FindUniqueSysUserIdentityCertificationArgs = Prisma.FindUniqueSysUserIdentityCertificationArgs

/**
 * @deprecated Renamed to `Prisma.FindFirstSysUserIdentityCertificationArgs`
 */
export type FindFirstSysUserIdentityCertificationArgs = Prisma.FindFirstSysUserIdentityCertificationArgs

/**
 * @deprecated Renamed to `Prisma.FindManySysUserIdentityCertificationArgs`
 */
export type FindManySysUserIdentityCertificationArgs = Prisma.FindManySysUserIdentityCertificationArgs

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationCreateArgs`
 */
export type SysUserIdentityCertificationCreateArgs = Prisma.SysUserIdentityCertificationCreateArgs

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationUpdateArgs`
 */
export type SysUserIdentityCertificationUpdateArgs = Prisma.SysUserIdentityCertificationUpdateArgs

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationUpdateManyArgs`
 */
export type SysUserIdentityCertificationUpdateManyArgs = Prisma.SysUserIdentityCertificationUpdateManyArgs

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationUpsertArgs`
 */
export type SysUserIdentityCertificationUpsertArgs = Prisma.SysUserIdentityCertificationUpsertArgs

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationDeleteArgs`
 */
export type SysUserIdentityCertificationDeleteArgs = Prisma.SysUserIdentityCertificationDeleteArgs

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationDeleteManyArgs`
 */
export type SysUserIdentityCertificationDeleteManyArgs = Prisma.SysUserIdentityCertificationDeleteManyArgs

/**
 * @deprecated Renamed to `Prisma.SysUserWhereInput`
 */
export type SysUserWhereInput = Prisma.SysUserWhereInput

/**
 * @deprecated Renamed to `Prisma.SysUserOrderByInput`
 */
export type SysUserOrderByInput = Prisma.SysUserOrderByInput

/**
 * @deprecated Renamed to `Prisma.SysUserWhereUniqueInput`
 */
export type SysUserWhereUniqueInput = Prisma.SysUserWhereUniqueInput

/**
 * @deprecated Renamed to `Prisma.SysUserLogWhereInput`
 */
export type SysUserLogWhereInput = Prisma.SysUserLogWhereInput

/**
 * @deprecated Renamed to `Prisma.SysUserLogOrderByInput`
 */
export type SysUserLogOrderByInput = Prisma.SysUserLogOrderByInput

/**
 * @deprecated Renamed to `Prisma.SysUserLogWhereUniqueInput`
 */
export type SysUserLogWhereUniqueInput = Prisma.SysUserLogWhereUniqueInput

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationWhereInput`
 */
export type SysUserIdentityCertificationWhereInput = Prisma.SysUserIdentityCertificationWhereInput

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationOrderByInput`
 */
export type SysUserIdentityCertificationOrderByInput = Prisma.SysUserIdentityCertificationOrderByInput

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationWhereUniqueInput`
 */
export type SysUserIdentityCertificationWhereUniqueInput = Prisma.SysUserIdentityCertificationWhereUniqueInput

/**
 * @deprecated Renamed to `Prisma.SysUserCreateInput`
 */
export type SysUserCreateInput = Prisma.SysUserCreateInput

/**
 * @deprecated Renamed to `Prisma.SysUserUpdateInput`
 */
export type SysUserUpdateInput = Prisma.SysUserUpdateInput

/**
 * @deprecated Renamed to `Prisma.SysUserUpdateManyMutationInput`
 */
export type SysUserUpdateManyMutationInput = Prisma.SysUserUpdateManyMutationInput

/**
 * @deprecated Renamed to `Prisma.SysUserLogCreateInput`
 */
export type SysUserLogCreateInput = Prisma.SysUserLogCreateInput

/**
 * @deprecated Renamed to `Prisma.SysUserLogUpdateInput`
 */
export type SysUserLogUpdateInput = Prisma.SysUserLogUpdateInput

/**
 * @deprecated Renamed to `Prisma.SysUserLogUpdateManyMutationInput`
 */
export type SysUserLogUpdateManyMutationInput = Prisma.SysUserLogUpdateManyMutationInput

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationCreateInput`
 */
export type SysUserIdentityCertificationCreateInput = Prisma.SysUserIdentityCertificationCreateInput

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationUpdateInput`
 */
export type SysUserIdentityCertificationUpdateInput = Prisma.SysUserIdentityCertificationUpdateInput

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationUpdateManyMutationInput`
 */
export type SysUserIdentityCertificationUpdateManyMutationInput = Prisma.SysUserIdentityCertificationUpdateManyMutationInput

/**
 * @deprecated Renamed to `Prisma.IntFilter`
 */
export type IntFilter = Prisma.IntFilter

/**
 * @deprecated Renamed to `Prisma.StringFilter`
 */
export type StringFilter = Prisma.StringFilter

/**
 * @deprecated Renamed to `Prisma.StringNullableFilter`
 */
export type StringNullableFilter = Prisma.StringNullableFilter

/**
 * @deprecated Renamed to `Prisma.BoolFilter`
 */
export type BoolFilter = Prisma.BoolFilter

/**
 * @deprecated Renamed to `Prisma.DateTimeFilter`
 */
export type DateTimeFilter = Prisma.DateTimeFilter

/**
 * @deprecated Renamed to `Prisma.DateTimeNullableFilter`
 */
export type DateTimeNullableFilter = Prisma.DateTimeNullableFilter

/**
 * @deprecated Renamed to `Prisma.SysUserLogListRelationFilter`
 */
export type SysUserLogListRelationFilter = Prisma.SysUserLogListRelationFilter

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationRelationFilter`
 */
export type SysUserIdentityCertificationRelationFilter = Prisma.SysUserIdentityCertificationRelationFilter

/**
 * @deprecated Renamed to `Prisma.SysUserRelationFilter`
 */
export type SysUserRelationFilter = Prisma.SysUserRelationFilter

/**
 * @deprecated Renamed to `Prisma.SysUserLogCreateManyWithoutSysUserInput`
 */
export type SysUserLogCreateManyWithoutSysUserInput = Prisma.SysUserLogCreateManyWithoutSysUserInput

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationCreateOneWithoutSysUserInput`
 */
export type SysUserIdentityCertificationCreateOneWithoutSysUserInput = Prisma.SysUserIdentityCertificationCreateOneWithoutSysUserInput

/**
 * @deprecated Renamed to `Prisma.StringFieldUpdateOperationsInput`
 */
export type StringFieldUpdateOperationsInput = Prisma.StringFieldUpdateOperationsInput

/**
 * @deprecated Renamed to `Prisma.NullableStringFieldUpdateOperationsInput`
 */
export type NullableStringFieldUpdateOperationsInput = Prisma.NullableStringFieldUpdateOperationsInput

/**
 * @deprecated Renamed to `Prisma.IntFieldUpdateOperationsInput`
 */
export type IntFieldUpdateOperationsInput = Prisma.IntFieldUpdateOperationsInput

/**
 * @deprecated Renamed to `Prisma.BoolFieldUpdateOperationsInput`
 */
export type BoolFieldUpdateOperationsInput = Prisma.BoolFieldUpdateOperationsInput

/**
 * @deprecated Renamed to `Prisma.DateTimeFieldUpdateOperationsInput`
 */
export type DateTimeFieldUpdateOperationsInput = Prisma.DateTimeFieldUpdateOperationsInput

/**
 * @deprecated Renamed to `Prisma.NullableDateTimeFieldUpdateOperationsInput`
 */
export type NullableDateTimeFieldUpdateOperationsInput = Prisma.NullableDateTimeFieldUpdateOperationsInput

/**
 * @deprecated Renamed to `Prisma.SysUserLogUpdateManyWithoutSysUserInput`
 */
export type SysUserLogUpdateManyWithoutSysUserInput = Prisma.SysUserLogUpdateManyWithoutSysUserInput

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationUpdateOneWithoutSysUserInput`
 */
export type SysUserIdentityCertificationUpdateOneWithoutSysUserInput = Prisma.SysUserIdentityCertificationUpdateOneWithoutSysUserInput

/**
 * @deprecated Renamed to `Prisma.SysUserCreateOneWithoutSysUserLogsInput`
 */
export type SysUserCreateOneWithoutSysUserLogsInput = Prisma.SysUserCreateOneWithoutSysUserLogsInput

/**
 * @deprecated Renamed to `Prisma.SysUserUpdateOneRequiredWithoutSysUserLogsInput`
 */
export type SysUserUpdateOneRequiredWithoutSysUserLogsInput = Prisma.SysUserUpdateOneRequiredWithoutSysUserLogsInput

/**
 * @deprecated Renamed to `Prisma.SysUserCreateOneWithoutSysUserIdentityCertificationInput`
 */
export type SysUserCreateOneWithoutSysUserIdentityCertificationInput = Prisma.SysUserCreateOneWithoutSysUserIdentityCertificationInput

/**
 * @deprecated Renamed to `Prisma.SysUserUpdateOneRequiredWithoutSysUserIdentityCertificationInput`
 */
export type SysUserUpdateOneRequiredWithoutSysUserIdentityCertificationInput = Prisma.SysUserUpdateOneRequiredWithoutSysUserIdentityCertificationInput

/**
 * @deprecated Renamed to `Prisma.NestedIntFilter`
 */
export type NestedIntFilter = Prisma.NestedIntFilter

/**
 * @deprecated Renamed to `Prisma.NestedStringFilter`
 */
export type NestedStringFilter = Prisma.NestedStringFilter

/**
 * @deprecated Renamed to `Prisma.NestedStringNullableFilter`
 */
export type NestedStringNullableFilter = Prisma.NestedStringNullableFilter

/**
 * @deprecated Renamed to `Prisma.NestedBoolFilter`
 */
export type NestedBoolFilter = Prisma.NestedBoolFilter

/**
 * @deprecated Renamed to `Prisma.NestedDateTimeFilter`
 */
export type NestedDateTimeFilter = Prisma.NestedDateTimeFilter

/**
 * @deprecated Renamed to `Prisma.NestedDateTimeNullableFilter`
 */
export type NestedDateTimeNullableFilter = Prisma.NestedDateTimeNullableFilter

/**
 * @deprecated Renamed to `Prisma.SysUserLogCreateWithoutSysUserInput`
 */
export type SysUserLogCreateWithoutSysUserInput = Prisma.SysUserLogCreateWithoutSysUserInput

/**
 * @deprecated Renamed to `Prisma.SysUserLogCreateOrConnectWithoutSysUserInput`
 */
export type SysUserLogCreateOrConnectWithoutSysUserInput = Prisma.SysUserLogCreateOrConnectWithoutSysUserInput

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationCreateWithoutSysUserInput`
 */
export type SysUserIdentityCertificationCreateWithoutSysUserInput = Prisma.SysUserIdentityCertificationCreateWithoutSysUserInput

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationCreateOrConnectWithoutSysUserInput`
 */
export type SysUserIdentityCertificationCreateOrConnectWithoutSysUserInput = Prisma.SysUserIdentityCertificationCreateOrConnectWithoutSysUserInput

/**
 * @deprecated Renamed to `Prisma.SysUserLogUpdateWithWhereUniqueWithoutSysUserInput`
 */
export type SysUserLogUpdateWithWhereUniqueWithoutSysUserInput = Prisma.SysUserLogUpdateWithWhereUniqueWithoutSysUserInput

/**
 * @deprecated Renamed to `Prisma.SysUserLogUpdateManyWithWhereWithoutSysUserInput`
 */
export type SysUserLogUpdateManyWithWhereWithoutSysUserInput = Prisma.SysUserLogUpdateManyWithWhereWithoutSysUserInput

/**
 * @deprecated Renamed to `Prisma.SysUserLogScalarWhereInput`
 */
export type SysUserLogScalarWhereInput = Prisma.SysUserLogScalarWhereInput

/**
 * @deprecated Renamed to `Prisma.SysUserLogUpsertWithWhereUniqueWithoutSysUserInput`
 */
export type SysUserLogUpsertWithWhereUniqueWithoutSysUserInput = Prisma.SysUserLogUpsertWithWhereUniqueWithoutSysUserInput

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationUpdateWithoutSysUserInput`
 */
export type SysUserIdentityCertificationUpdateWithoutSysUserInput = Prisma.SysUserIdentityCertificationUpdateWithoutSysUserInput

/**
 * @deprecated Renamed to `Prisma.SysUserIdentityCertificationUpsertWithoutSysUserInput`
 */
export type SysUserIdentityCertificationUpsertWithoutSysUserInput = Prisma.SysUserIdentityCertificationUpsertWithoutSysUserInput

/**
 * @deprecated Renamed to `Prisma.SysUserCreateWithoutSysUserLogsInput`
 */
export type SysUserCreateWithoutSysUserLogsInput = Prisma.SysUserCreateWithoutSysUserLogsInput

/**
 * @deprecated Renamed to `Prisma.SysUserCreateOrConnectWithoutSysUserLogsInput`
 */
export type SysUserCreateOrConnectWithoutSysUserLogsInput = Prisma.SysUserCreateOrConnectWithoutSysUserLogsInput

/**
 * @deprecated Renamed to `Prisma.SysUserUpdateWithoutSysUserLogsInput`
 */
export type SysUserUpdateWithoutSysUserLogsInput = Prisma.SysUserUpdateWithoutSysUserLogsInput

/**
 * @deprecated Renamed to `Prisma.SysUserUpsertWithoutSysUserLogsInput`
 */
export type SysUserUpsertWithoutSysUserLogsInput = Prisma.SysUserUpsertWithoutSysUserLogsInput

/**
 * @deprecated Renamed to `Prisma.SysUserCreateWithoutSysUserIdentityCertificationInput`
 */
export type SysUserCreateWithoutSysUserIdentityCertificationInput = Prisma.SysUserCreateWithoutSysUserIdentityCertificationInput

/**
 * @deprecated Renamed to `Prisma.SysUserCreateOrConnectWithoutSysUserIdentityCertificationInput`
 */
export type SysUserCreateOrConnectWithoutSysUserIdentityCertificationInput = Prisma.SysUserCreateOrConnectWithoutSysUserIdentityCertificationInput

/**
 * @deprecated Renamed to `Prisma.SysUserUpdateWithoutSysUserIdentityCertificationInput`
 */
export type SysUserUpdateWithoutSysUserIdentityCertificationInput = Prisma.SysUserUpdateWithoutSysUserIdentityCertificationInput

/**
 * @deprecated Renamed to `Prisma.SysUserUpsertWithoutSysUserIdentityCertificationInput`
 */
export type SysUserUpsertWithoutSysUserIdentityCertificationInput = Prisma.SysUserUpsertWithoutSysUserIdentityCertificationInput

/**
 * @deprecated Renamed to `Prisma.SysUserLogUpdateWithoutSysUserInput`
 */
export type SysUserLogUpdateWithoutSysUserInput = Prisma.SysUserLogUpdateWithoutSysUserInput