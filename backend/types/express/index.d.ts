declare global {
  namespace Express {
    interface User {
      id: string
      userType: string
    }

    interface Request {
      user?: User
    }
  }
}

export {}
