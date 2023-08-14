import SignIn from '@/components/signIn/signIn'
import SigninSocialContainer from '@/components/signIn/signinSocialContainer'

export default function SignInPage() {
  return (
    <SignIn>
      <SigninSocialContainer userType="forFun" />
    </SignIn>
  )
}
