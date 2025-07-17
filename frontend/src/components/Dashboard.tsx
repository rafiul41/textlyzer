import { useKeycloak } from "@react-keycloak/web";

export default function Dashboard() {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome {keycloak.tokenParsed?.preferred_username}</h1>
      <h1>Welcome to Textlyzer Dashboard!</h1>
    </div>
  )
} 