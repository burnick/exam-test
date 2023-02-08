import styled from 'styled-components';
import Login from 'pages/Login';
import AdminPage from 'pages/Admin';
import useUserContext from 'components/UserContext';

function App() {
  const { foundUser } = useUserContext();

  return <Container>{!foundUser ? <Login /> : <AdminPage />}</Container>;
}

const Container = styled.div`
  all: unset;
  font-family: ${(props) => props.theme.typography.fontFamily};
  margin: ${(props) => props.theme.body.margin};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
`;
export default App;
