import { Response } from 'express'
import { db, auth } from './config/firebase'

export { getUser, updateUser }

type UserType = {
  phoneNumber: string
  name: string
  email: string
  uid: string
}

type RequestUpdate = {
  body: UserType
}

type RequestGet = {
  query: {
    uid: string
  }
}

const getUser = async (req: RequestGet, res: Response) => {
  const {
    query: { uid },
  } = req

  try {
    const authUser = await auth.getUser(uid)
    const phoneNumber = authUser.phoneNumber || ''
    if (authUser.uid !== uid) {
      throw Error('User not logged in')
    } else {
      const user = db.collection('users').doc(phoneNumber)
      const currentData = (await user.get()).data() || {}
      return res.status(200).json(currentData)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      return res.status(500).json(error.message)
    } else {
      console.log('Unexpected error', error)
      return res.status(500)
    }
  }
}

const updateUser = async (req: RequestUpdate, res: Response) => {
  const {
    body: { phoneNumber, name, email, uid },
  } = req

  try {
    const authUser = await auth.getUser(uid)
    if (authUser.uid !== uid) {
      throw Error('User not logged in')
    } else {
      const user = db.collection('users').doc(phoneNumber)
      const currentData = (await user.get()).data() || {}
      const userObject = {
        name: name || currentData.name,
        email: email || currentData.email,
      }

      await user.set(userObject).catch((error) => {
        return res.status(400).json({
          status: 'error',
          message: error.message,
        })
      })

      return res.status(200).json({
        status: 'success',
        message: 'user updated successfully',
        data: userObject,
      })
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      return res.status(500).json(error.message)
    } else {
      console.log('Unexpected error', error)
      return res.status(500)
    }
  }
}
