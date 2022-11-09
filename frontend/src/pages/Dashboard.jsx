import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Icon from '../components/shared/Icon'

import {
  EDIT_ICON,
  PLUS_ICON,
  USER_ICON,
  LOCK_ICON,
  SAND_BOX_ICON
} from '../utils/icons'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Spinner from '../components/shared/Spinner'
import EditRecordButton from '../components/shared/EditRecordButton'
import {
  profileFields,
  editPasswordFields
} from '../forms/fields-and-forms/authFields'

import { toast } from 'react-toastify'
import useForm from '../forms/form-hooks/useForm'

import { updateProfile } from '../features/auth/authSlice'


import { useSelector, useDispatch } from 'react-redux'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const { name, email } = user
  const editProfileForm = useForm(profileFields, { name, email })
  const editPasswordForm = useForm(editPasswordFields, {
    password: '',
    confirmPassword: ''
  })

  const dispatch = useDispatch()

  const editProfileFunction = () => {
    dispatch(updateProfile(editProfileForm.values))
      .unwrap()
      .then(() => {
        toast.success('Profile updated!')
      })
      .catch(toast.error)
  }

  const editPasswordFunction = () => {
    const { password } = editPasswordForm.values
    dispatch(updateProfile({ name, email, password }))
      .unwrap()
      .then(() => {
        toast.success('Password updated!')
      })
      .catch(toast.error)
  }

  

  if (!user) return <Spinner />

  return (
    <Container style={{ width: '500px' }}>
      
      <div className='d-grid gap-2 mb-3'>
        <EditRecordButton
          variant='outline-dark'
          icon={USER_ICON}
          buttonText='Edit Profile'
          title='Edit Profile'
          form={editProfileForm.form}
          editFunction={editProfileFunction}
          cancelFunction={editProfileForm.reset}
          disabled={
            !editProfileForm.validateForm(editProfileForm.form) ||
            !editProfileForm.changesMade(
              { name: user.name, email: user.email },
              editProfileForm.values
            )
          }
        />
      </div>
      <div className='d-grid gap-2 mb-3'>
        <EditRecordButton
          variant='outline-dark'
          icon={LOCK_ICON}
          buttonText='Edit Password'
          title='Edit Password'
          form={editPasswordForm.form}
          editFunction={editPasswordFunction}
          cancelFunction={editPasswordForm.reset}
          disabled={
            !editPasswordForm.validateForm(editPasswordForm.form) ||
            !editPasswordForm.changesMade(
              { name: user.name, email: user.email },
              editPasswordForm.values
            )
          }
        />
      </div>
     
      

      <Link to='/sandbox' style={{ textDecoration: 'none' }}>
        <div className='d-grid gap-2 mb-3'>
          <Button variant='outline-dark'>
            <Icon icon={SAND_BOX_ICON} /> Sand Box
          </Button>
        </div>
      </Link>
    </Container>
  )
}

export default Dashboard
