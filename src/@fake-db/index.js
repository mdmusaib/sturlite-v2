import mock from './mock'
import './apps/calendar'
import './auth/jwt'

mock.onAny().passThrough()