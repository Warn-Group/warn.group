# warn.group

## Getting Started

Run the development server:

```bash
bun run dev
```

## Install dependencies

```bash
bun install
```

## Update dependencies

```bash
bun update
```

## Database structure

⚠ Subject to change

`optional[T] == (<T> | undefined)`

### Users

```
users
└───{userId}
    ├───birthdate         (optional[timestamp])
    ├───displayName       (string)
    ├───gender            (optional[string])
    ├───metadata
    │   ├───createdAt     (timestamp)
    │   └───lastLoginAt   (timestamp)
    ├───photoURL          (optional[string])
    └───uid               (string)
```

🚧 In progress..

### Global

```
├───status
│   └───{userId}
│       ├───status
│       └───updatedAt
├───users
│   └───{userId}
│       ├───birthdate
│       ├───displayName
│       ├───email
│       ├───emailVerified
│       ├───gender
│       ├───groups
│       │   └───[groupIds]
│       ├───metadata
│       │   ├───createdAt
│       │   └───lastLoginAt
│       ├───photoURL
│       ├───providerId
│       └───uid
├───groups
│   └───{groupId}
│       ├───name
│       ├───description
│       ├───createdAt
│       ├───createdBy
│       ├───members
│       │   └───{userId}
│       │       ├───joinedAt
│       │       └───joinedBy
│       └───messages
│           └───{messageId}
│               ├───type
│               ├───sentAt
│               ├───sentBy
│               └───content
└───messages
    └───{userId-userId}
        └───messages
            └───{messageId}
                ├───type
                ├───sentAt
                ├───sentBy
                └───content
```