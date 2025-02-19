import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Active from '../assets/active.svg'
import Pic from '../assets/pic.png'
import Header from "../../../components/Header";
import { useRouteMatch, Link } from 'react-router-dom';
import UserOrganization from './UserOrganization'

const WorkspaceHome = () => {
  const { url } = useRouteMatch()
  const [organizations, setOrganizations] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    if (user) {
      setUser(user)
      console.log(user)
      const { email, id, token } = user
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      async function fetchData() {
        const result = await axios.get(
          `https://api.zuri.chat/users/${email}/organizations`,
          config
        )
        const { data } = result.data
        console.log(data)
        setOrganizations(data)
      }
      fetchData()
    }
  }, [])
  return (
    <Wrapper>
      <Header />
      <TopSection
        style={
          user === true ? { paddingBottom: '0' } : { paddingBottom: '50px' }
        }
      >
        <TextSection>
          <Heading>Create a new workspace</Heading>
          <Text>
            Slack gives your team a home — a place where they can talk and work
            together. To create a new workspace, click the button below
          </Text>
          <Link to={`${url}/step1`}>
            <Button>
              Create a new workspace
              <img src={Active} alt="" />
            </Button>
          </Link>

          <CheckboxSide>
            <input type="checkbox" />
            <p>It's okay to receive emails from Zuri Chat</p>
          </CheckboxSide>
          <FadedText>
            By continuing, you’re agreeing to our Customer Terms of Service,
            Privacy Policy, and Cookie Policy.
          </FadedText>
        </TextSection>
        <ImageSection>
          <img src={Pic} alt="" />
        </ImageSection>
      </TopSection>
      {user ? (
        <UserOrganization user={user} organizations={organizations} />
      ) : null}
    </Wrapper>
  )
}

const Wrapper = styled.div``

const TopSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 175px;
  padding-left: 172px;

  @media (max-width: 35rem) {
    display: flex;
    flex-direction: column-reverse;
    grid-template-columns: 1fr;
    padding-top: 105px;
    padding-left: 24px;
    padding-right: 24px;
  }
`
const Heading = styled.h1`
  margin: 0;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 48px;
  width: 320px;
  margin-bottom: 14px;
  color: #333333;
`

const Text = styled.p`
  margin: 0;
  max-width: 510px;
  font-weight: 400;
  font-family: 'Lato', sans-serif;
  font-size: ${18 / 16}rem;
  line-height: 26.91px;
  color: #333333;
  margin-bottom: 29px;
`
export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 13px;
  border: none;
  padding: 16px 24px;
  background: #00b87c;
  font-weight: 600;
  color: white;
  font-size: ${18 / 16}rem;
  font-family: 'Lato', sans-serif;
  border-radius: 3px;
  transition: filter 600ms;
  cursor: pointer;
  &:hover {
    filter: brightness(110%);
    transition: filter 250ms;
  }
  & > img {
    margin-top: 3px;
  }
  @media (max-width: 35rem) {
    font-size: 1rem;
  }
`
const CheckboxSide = styled.div`
  display: flex;
  margin-top: 33px;
  align-items: center;
  gap: 9.83px;
  & > input {
    margin: 0;
  }
  & > p {
    margin: 0;
    font-size: ${14 / 16}rem;
    color: #333333;
    font-weight: 400;
    font-family: 'Lato', sans-serif;
  }
`
const FadedText = styled.p`
  color: hsla(0, 0%, 20%, 0.51);
  font-weight: 500;
  font-family: 'Lato', sans-serif;
  font-size: ${13 / 16}rem;
  max-width: 325px;
  line-height: 18.78px;
  margin-top: 9px;
`

const ImageSection = styled.div`
  @media (max-width: 35rem) {
    margin-bottom: 41px;
    & > img {
      width: 100%;
    }
  }
`
const TextSection = styled.div``
export default WorkspaceHome;
